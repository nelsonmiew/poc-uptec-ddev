<?php
function admin_enqueue_styles(){
	wp_enqueue_style('admin-style', get_stylesheet_directory_uri() . '/admin/admin.css', 'admin-style', '');
} add_action('admin_head', 'admin_enqueue_styles');

function modify_jquery() {
    if (!is_admin()) {
        // comment out these lines to load the local copy of jQuery
		wp_deregister_script('jquery');
        wp_register_script('jquery', get_stylesheet_directory_uri() . '/dist/jquery-3.3.1.min.js', '', '3.3.1', false);
		wp_enqueue_script('jquery'); // Enqueue it!
    }
} 
add_action('init', 'modify_jquery', 10);

function theme_enqueue_metas() { ?>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0,maximum-scale=10.0,user-scalable=no, shrink-to-fit=no">
	<meta name="format-detection" content="telephone=no" />

	<meta name="mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="application-name" content="<?php echo NOME_SITE; ?>">
	<meta name="apple-mobile-web-app-title" content="<?php echo NOME_SITE; ?>">
	<meta name="theme-color" content="<?php echo COR_SITE; ?>">
	<meta name="msapplication-navbutton-color" content="<?php echo COR_SITE; ?>">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

	<meta name="msapplication-TileColor" content="#FFFFFF" />
	<meta name="msapplication-TileImage" content="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon/mstile-144x144.png" />
	<meta name="msapplication-square70x70logo" content="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon/mstile-70x70.png" />
	<meta name="msapplication-square150x150logo" content="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon/mstile-150x150.png" />
	<meta name="msapplication-wide310x150logo" content="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon/mstile-310x150.png" />
	<meta name="msapplication-square310x310logo" content="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon/mstile-310x310.png" />

	<link href="//www.google-analytics.com" rel="dns-prefetch">

	<link rel="apple-touch-icon-precomposed" sizes="57x57" href="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon/apple-touch-icon-57x57.png" />
	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon/apple-touch-icon-114x114.png" />
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon/apple-touch-icon-72x72.png" />
	<link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon/apple-touch-icon-144x144.png" />
	<link rel="apple-touch-icon-precomposed" sizes="60x60" href="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon/apple-touch-icon-60x60.png" />
	<link rel="apple-touch-icon-precomposed" sizes="120x120" href="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon/apple-touch-icon-120x120.png" />
	<link rel="apple-touch-icon-precomposed" sizes="76x76" href="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon/apple-touch-icon-76x76.png" />
	<link rel="apple-touch-icon-precomposed" sizes="152x152" href="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon/apple-touch-icon-152x152.png" />
	<link rel="icon" type="image/png" href="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon/favicon-196x196.png" sizes="196x196" />
	<link rel="icon" type="image/png" href="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/png" href="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon/favicon-32x32.png" sizes="32x32" />
	<link rel="icon" type="image/png" href="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon/favicon-16x16.png" sizes="16x16" />
	<link rel="icon" type="image/png" href="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon/favicon-128.png" sizes="128x128" />

	<meta property="og:image" content="<?php echo get_stylesheet_directory_uri(); ?>/img/elem/intro.jpg" />
<?php 
}
add_action( 'wp_head', 'theme_enqueue_metas' );


function theme_enqueue_scripts(){
	global $wp_query;
	wp_enqueue_style('uncode-style', get_stylesheet_directory_uri() . '/style.css', 'uncode-style', '');
	wp_enqueue_style('child-style-custom', get_stylesheet_directory_uri() . '/dist/miew.style.min.css', 'uncode-custom-child', '');

    if ($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()) {
		wp_register_style('vendors', get_stylesheet_directory_uri() . '/dist/vendors.min.css', array(), '', 'all');
		wp_enqueue_style('vendors'); // Enqueue it!

		wp_register_script('vendors', get_stylesheet_directory_uri() . '/dist/vendors.min.js', array('jquery'), '', true);
		
		wp_enqueue_script('vendors'); // Enqueue it!

        wp_register_script('customscript', get_stylesheet_directory_uri() . '/dist/miew.scripts.js', array('jquery', 'vendors'), '', true);
		wp_enqueue_script('customscript'); // Enqueue it!

		wp_localize_script( 'customscript', 'phpVars', array( 
			'stylesheet_directory_uri' => get_stylesheet_directory_uri(),
			'ajaxurl' => admin_url('admin-ajax.php'),
			'query_vars' => json_encode( $wp_query->query ),
			'entrada_nonce' => wp_create_nonce('mostraEntrada_noonce'),
			'jobs_nonce' => wp_create_nonce('getJobs_noonce'),
			'empresas_nonce' => wp_create_nonce('getEmpresas_noonce'),
			'centers_nonce' => wp_create_nonce('getCenters_noonce'),
		));
    }
}
add_action('wp_enqueue_scripts', 'theme_enqueue_scripts');

// remove wp version param from any enqueued scripts
function removeScriptsVersion( $src ) {
    if (strpos( $src, 'ver=' . get_bloginfo( 'version' ) ) )
        $src = remove_query_arg( 'ver', $src );
    return $src;
}
add_filter( 'style_loader_src', 'removeScriptsVersion', 9999 );
add_filter( 'script_loader_src', 'removeScriptsVersion', 9999 );


function add_defer_async_to_script( $tag, $handle, $src ) {
	if (is_admin())
	{
		return $tag;
	}
    $defer_script = array('vendors', 'thickbox', 'wp-embed', 'contact-form-7', 'js-cookie', 'uncode-plugins', 'uncode-app', 'mediaelement-migrate', 'wp-mediaelement', 'mediaelement-core', 'wcpf-plugin-polyfills-script', 'wcpf-plugin-vendor-script', 'accounting', 'wcpf-plugin-script', 'wc-add-to-cart', 'vc_woocommerce-add-to-cart-js'); 
    $async_script = array('elfsight-instagram-feed', 'uncode-privacy', 'newsletter-subscription', 'cookie-notice-front'); 
    //you can use this to make all defer
		//$tag = str_replace( ' src', ' defer src', $tag );
		
    // You can use this to make it work as below for a specific script
    if(in_array($handle, $defer_script) === true){
        $tag = '<script defer="defer" type="text/javascript" src="' . esc_url( $src ) . '"></script>';
    }
    if(in_array($handle, $async_script) === true){
        $tag = '<script async="async" type="text/javascript" src="' . esc_url( $src ) . '"></script>';
    }

    return $tag;
}

add_filter( 'script_loader_tag', 'add_defer_async_to_script', 10, 3 );

function enqueue_contact_form_7_script() {
	if (function_exists('wpcf7_enqueue_scripts')) {
		wpcf7_enqueue_scripts();
	}
}
add_action('wp_enqueue_scripts', 'enqueue_contact_form_7_script');