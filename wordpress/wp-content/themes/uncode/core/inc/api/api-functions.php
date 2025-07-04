<?php
/**
 * API related functions
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! function_exists( 'uncode_get_domain' ) ) :

	/**
	 * Extract domain from hostname
	 */
	function uncode_get_domain() {
		$hostname = uncode_get_server_hostname();

		// IP address, return hostname
		if ( filter_var( $hostname, FILTER_VALIDATE_IP ) ) {
			return $hostname;
		}

		$pieces = parse_url( $hostname );
		$domain = isset( $pieces[ 'path' ] ) ? $pieces[ 'path' ] : '';

		// Real domain
		if ( preg_match( '/(?P<domain>[a-z0-9][a-z0-9\-]{1,100}\.[a-z\.]{2,40})$/i', $domain, $regs ) ) {
			return $regs[ 'domain' ];
		}

		// Localhost
		if ( $hostname ) {
			return $hostname;
		}

		return false;
	}

endif;

if ( ! function_exists( 'uncode_get_purchase_code_option_name' ) ) :

	/**
	 * Get purchase code option name
	 */
	function uncode_get_purchase_code_option_name() {
		return 'envato_purchase_code_13373220';
	}

endif;

if ( ! function_exists( 'uncode_get_purchase_code' ) ) :

	/**
	 * Get registered purchase code
	 */
	function uncode_get_purchase_code() {
		$purchase_code = get_option( uncode_get_purchase_code_option_name(), false );

		return $purchase_code;
	}

endif;

if ( ! function_exists( 'uncode_api_check_response' ) ) :

	/**
	 * Check response from our API
	 *
	 * Returns:
	 *     1  - Purchase code saved - Ok
	 *     3  - This is the domain already registered with the purchase code, or a subdomain - Ok
	 *     4  - Invalid purchase code
	 *     5  - Reached domains limit
	 *     6  - Envato API down
	 *     7  - Can't connect to our server
	 *     8  - Endpoint not found
	 *     9  - Access forbidden from our server
	 *     10 - Access forbidden (general)
	 *     11 - Unknown error on response
	 *     12 - Cloudflare captcha
	 *     13 - Unknown error
	 *     14 - WP error on body response
	 *     15 - Malformed purchase code
	 *     16 - Error during save
	 *     17 - 404 error from Envato
	 *     18 - 403 error from Envato
	 *     19 - 401 error from Envato
	 *     20 - This is not a purchase code for Uncode
	 *     21 - For some reason we cannot verify this purchase code
	 *     22 - 500 error from our server
	 *     23 - Purchase code not found
	 *     24 - Error during select
	 *
	 * Never use 100 for the error code (already in use)!
	 */
	function uncode_api_check_response( $response ) {
		// WP error on post request
		if ( is_wp_error( $response ) ) {
			return 7;
		}

		// WP error on body
		$response_data = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( is_wp_error( $response_data ) ) {
			return 14;
		}

		$response_code = wp_remote_retrieve_response_code( $response );

		// Check for errors
		if ( 404 === $response_code ) {
			// Endpoint not found
			return 8;
		} else if ( 403 === $response_code ) {
			if ( wp_remote_retrieve_header( $response, 'uncode-api' ) ) {
				// Access forbidden from our server
				return 9;
			} else if ( wp_remote_retrieve_header( $response, 'cf-chl-bypass' ) ) {
				// Cloudflare challenge page
				return 12;
			}

			// Access forbidden (probably Cloudflare)
			return 10;
		} else if ( 500 === $response_code ) {
			// 500 error from our server
			return 22;
		} else if ( 200 !== $response_code ) {
			// Something different than 200 was returned
			return 11;
		}

		// Check response
		if ( isset( $response_data[ 'limit_reached' ] ) ) {
			// Reached domains limit
			return 5;
		} else if ( isset( $response_data[ 'malformed_code' ] ) ) {
			// Malformed purchase code
			return 15;
		} else if ( isset( $response_data[ 'envato_down' ] ) ) {
			// Envato API down
			return 6;
		} else if ( isset( $response_data[ 'invalid_purchase_code' ] ) ) {
			// Invalid purchase code
			return 4;
		} else if ( isset( $response_data[ '404_from_envato' ] ) ) {
			// 404 error from Envato
			return 17;
		} else if ( isset( $response_data[ '403_from_envato' ] ) ) {
			// 403 error from Envato
			return 18;
		} else if ( isset( $response_data[ '401_from_envato' ] ) ) {
			// 401 error from Envato
			return 19;
		} else if ( isset( $response_data[ 'invalid_uncode_purchase_code' ] ) ) {
			// This is not a purchase code for Uncode
			return 20;
		} else if ( isset( $response_data[ 'cannot_verify' ] ) ) {
			// For some reason we cannot verify this purchase code
			return 21;
		} else if ( isset( $response_data[ 'same_domain' ] ) ) {
			// Same domain - Ok
			return 3;
		} else if ( isset( $response_data[ 'error_db_save' ] ) ) {
			// Something went wrong during the save
			return 16;
		} else if ( isset( $response_data[ 'error_db_select' ] ) ) {
			// Something went wrong during the select
			return 24;
		} else if ( isset( $response_data[ 'purchase_code_not_found' ] ) ) {
			// Purchase code not found
			return 23;
		} else if ( isset( $response_data[ 'purchase_code_saved' ] ) ) {
			// Purchase code saved - Ok
			return 1;
		}

		return 13;
	}

endif;

if ( ! function_exists( 'uncode_upgrader_pre_download' ) ) :

	/**
	 * Before to download a premium plugin, validate the purchase code
	 */
	function uncode_upgrader_pre_download( $reply, $package, $upgrader ) {
		if ( ! defined( 'ENVATO_HOSTED_SITE' ) ) {
			$purchase_code = uncode_get_purchase_code();

			if ( strpos( $package, 'api.undsgn.com/downloads' ) !== false ) {
				if ( ! $purchase_code ) {
					return new WP_Error( 'uncode_premium_plugin_activation_error', sprintf( wp_kses( __( '<span class="uncode-premium-plugin-activation-error">You need to register Uncode before to install this plugin. <a href="%s">Register Uncode</a></span>', 'uncode' ), array( 'span' => array( 'class' => array() ), 'a' => array( 'href' => array() ) ) ), esc_url( admin_url( 'admin.php?page=uncode-system-status' ) ) ) );
				}

				$response = wp_remote_post( 'https://api.undsgn.com/uncode-license/validate-license.php', array(
					'timeout' => 45
				) );

				$response_code = uncode_api_check_response( $response );

				if ( $response_code === 23 ) {
					// Purchase code not found
					return new WP_Error( 'uncode_premium_plugin_activation_error', wp_kses_post( __( '<span class="uncode-premium-plugin-activation-error">There is an expected problem related to a possible website migration. Please remove the Purchase Code and register the product again from the System Status to validate the Purchase Code again. If the issue persists <a href="https://support.undsgn.com/hc/en-us/articles/360000836318" target="_blank">contact the theme author.</a> (Error 23)</span>', 'uncode' ) ) );
				} else if ( $response_code !== 3 ) {
					// General message
					return new WP_Error( 'uncode_premium_plugin_activation_error', sprintf( wp_kses_post( __( '<span class="uncode-premium-plugin-activation-error">Purchase code verification failed. <a href="https://support.undsgn.com/hc/en-us/articles/360000836318" target="_blank">Please contact the theme author.</a> (Error %s)</span>', 'uncode' ) ), $response_code ) );
				}
			}
		}

		return $reply;
	}

endif;
add_filter( 'upgrader_pre_download', 'uncode_upgrader_pre_download', 10, 3 );

if ( ! function_exists( 'uncode_api_user_agent' ) ) :

	/**
	 * Get user agent for connections with our API.
	 */
	function uncode_api_user_agent() {
		return 'Uncode API';
	}

endif;

if ( ! function_exists( 'uncode_api_download_file' ) ) :

	/**
	 * Pass headers to our API.
	 */
	function uncode_api_download_file( $r, $url ) {
		if ( strpos( $url, 'api.undsgn.com' ) !== false ) {
			// Pass user agent
			$r[ 'user-agent' ] = uncode_api_user_agent();

			// Pass other required parameters
			$r[ 'headers' ]    = array(
				'installationurl' => get_site_url(),
				'domain'          => uncode_get_domain(),
				'purchasecode'    => uncode_get_purchase_code()
			);
		}

		return $r;
	}

endif;
add_filter( 'http_request_args', 'uncode_api_download_file', 10, 2 );

if ( ! function_exists( 'uncode_get_premium_plugins' ) ) :

	/**
	 * Retrieve a list of premium plugins included in Uncode.
	 */
	function uncode_get_premium_plugins() {
		$plugins = array(
			'uncode-js_composer' => array(
				'plugin_name'        => 'Uncode WPBakery Page Builder',
				'plugin_slug'        => 'uncode-js_composer',
				'plugin_path'        => 'uncode-js_composer/js_composer.php',
				'plugin_url'         => trailingslashit( WP_PLUGIN_URL ) . 'uncode-js_composer',
				'remote_url'         => 'https://api.undsgn.com/downloads/uncode/plugins/uncode-js_composer/api.json',
				'zip_url'            => 'https://api.undsgn.com/downloads/uncode/plugins/uncode-js_composer/uncode-js_composer.zip',
				'required'           => true,
				'version'            => '7.8',
				'force_activation'   => false,
				'force_deactivation' => false,
			),
			'vc_clipboard' => array(
				'plugin_name'        => 'WPBakery Page Builder (Visual Composer) Clipboard',
				'plugin_slug'        => 'vc_clipboard',
				'plugin_path'        => 'vc_clipboard/vc_clipboard.php',
				'plugin_url'         => trailingslashit( WP_PLUGIN_URL ) . 'vc_clipboard',
				'remote_url'         => 'https://api.undsgn.com/downloads/uncode/plugins/vc-clipboard/api.json',
				'zip_url'            => 'https://api.undsgn.com/downloads/uncode/plugins/vc-clipboard/vc_clipboard.zip',
				'required'           => false,
				'version'            => '5.0.4',
				'force_activation'   => false,
				'force_deactivation' => false,
			),
			'revslider' => array(
				'plugin_name'        => 'Revolution Slider',
				'plugin_slug'        => 'revslider',
				'plugin_path'        => 'revslider/revslider.php',
				'plugin_url'         => trailingslashit( WP_PLUGIN_URL ) . 'revslider',
				'remote_url'         => 'https://api.undsgn.com/downloads/uncode/plugins/revslider/api.json',
				'zip_url'            => 'https://api.undsgn.com/downloads/uncode/plugins/revslider/revslider.zip',
				'required'           => false,
				'version'            => '6.7.23',
				'force_activation'   => false,
				'force_deactivation' => false,
			),
			'uncode-privacy' => array(
				'plugin_name'        => 'Uncode Privacy',
				'plugin_slug'        => 'uncode-privacy',
				'plugin_path'        => 'uncode-privacy/uncode-privacy.php',
				'plugin_url'         => trailingslashit( WP_PLUGIN_URL ) . 'uncode-privacy',
				'remote_url'         => 'https://api.undsgn.com/downloads/uncode/plugins/uncode-privacy/api.json',
				'zip_url'            => 'https://api.undsgn.com/downloads/uncode/plugins/uncode-privacy/uncode-privacy.zip',
				'required'           => false,
				'version'            => '2.2.4',
				'force_activation'   => false,
				'force_deactivation' => false,
			),
			'uncode-wireframes' => array(
				'plugin_name'        => 'Uncode Wireframes',
				'plugin_slug'        => 'uncode-wireframes',
				'plugin_path'        => 'uncode-wireframes/uncode-wireframes.php',
				'plugin_url'         => trailingslashit( WP_PLUGIN_URL ) . 'uncode-wireframes',
				'remote_url'         => 'https://api.undsgn.com/downloads/uncode/plugins/uncode-wireframes/api.json',
				'zip_url'            => 'https://api.undsgn.com/downloads/uncode/plugins/uncode-wireframes/uncode-wireframes.zip',
				'required'           => false,
				'version'            => '1.7.1',
				'force_activation'   => false,
				'force_deactivation' => false,
			),
		);

		if ( apply_filters( 'uncode_enable_remote_uncode_core', false ) ) {
			$plugins['uncode-core'] = uncode_get_uncode_core_plugin_conf();
		}

		return apply_filters( 'uncode_get_premium_plugins', $plugins );
	}

endif;

if ( ! function_exists( 'uncode_get_uncode_core_plugin_conf' ) ) :

	/**
	 * Get Uncode Core plugin data conf.
	 */
	function uncode_get_uncode_core_plugin_conf() {
		$conf = array(
			'plugin_name'        => 'Uncode Core',
			'plugin_slug'        => 'uncode-core',
			'plugin_path'        => 'uncode-core/uncode-core.php',
			'plugin_url'         => trailingslashit( WP_PLUGIN_URL ) . 'uncode-core',
			'remote_url'         => 'https://api.undsgn.com/downloads/uncode/plugins/uncode-core/api.json',
			'zip_url'            => 'https://api.undsgn.com/downloads/uncode/plugins/uncode-core/uncode-core.zip',
			'required'           => true,
			'version'            => '2.9.1.4',
			'force_activation'   => true,
			'force_deactivation' => true,
		);

		return $conf;
	}

endif;

if ( ! function_exists( 'uncode_get_premium_plugins_slugs' ) ) :

	/**
	 * Get slugs of premium plugins included in Uncode.
	 */
	function uncode_get_premium_plugins_slugs() {
		$plugins = uncode_get_premium_plugins();

		return array_keys( $plugins );
	}

endif;

/**
 * Check validity of purchase code.
 */
function uncode_check_valid_purchase_code() {
	$is_valid      = true;
	$purchase_code = trim( uncode_get_purchase_code() );

	if ( $purchase_code && ! preg_match("/^([a-f0-9]{8})-(([a-f0-9]{4})-){3}([a-f0-9]{12})$/i", $purchase_code ) ) {
		$is_valid = false;
	}

	$purchase_code_chars = str_replace('-', '', $purchase_code );

	if ( strlen( $purchase_code_chars ) > 0 && isset( $purchase_code_chars[0] ) ) {
		$first_char          = $purchase_code_chars[0];
		$has_same_chars      = true;

		for ( $i = 1; $i < strlen( $purchase_code_chars ); $i++ ) {
			if ( $purchase_code_chars[$i] != $first_char ) {
				$has_same_chars = false;
			}
		}

		if ( $has_same_chars ) {
			$is_valid = false;
		}
	}


	return $is_valid;
}
