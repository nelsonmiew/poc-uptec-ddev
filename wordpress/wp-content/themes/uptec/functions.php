<?php
if ( file_exists( dirname( __FILE__ ) . '/cmb2/init.php' ) ) {
    require_once dirname( __FILE__ ) . '/cmb2/init.php';
} elseif ( file_exists( dirname( __FILE__ ) . '/CMB2/init.php' ) ) {
    require_once dirname( __FILE__ ) . '/CMB2/init.php';
}

add_filter('use_block_editor_for_post', '__return_false');
 add_filter( 'wpcf7_validate_configuration', '__return_false' );


/**
 * Load site configuration
 */
require_once (get_stylesheet_directory() . '/functions/config.php');

/**
 * Enque scripts
 */
require_once (get_stylesheet_directory() . '/functions/scripts.php');

/**
 * AJAX functions
 */
require_once (get_stylesheet_directory() . '/functions/ajax.php');


/**
 * Custom post types
 */
require_once (get_stylesheet_directory() . '/functions/post-types.php');


/**
 * Custom metaboxes
 */
require_once (get_stylesheet_directory() . '/functions/metaboxes.php');


/**
 * Custom vc elements
 */
require_once (get_stylesheet_directory() . '/functions/vc-miew.php');


/**
 * OVERWRITE: Load menu builder.
 */
require_once get_stylesheet_directory() . '/partials/menus.php';


add_action('map_meta_cap', 'custom_manage_privacy_options', 1, 4);
function custom_manage_privacy_options($caps, $cap, $user_id, $args)
{
  if (!is_user_logged_in()) return $caps;

  $roles = !empty($user_meta->roles) ? $user_meta->roles : [];
  if (array_intersect(['editor', 'administrator'], (array) $user_meta->roles)) {
    if ('manage_privacy_options' === $cap) {
      $manage_name = is_multisite() ? 'manage_network' : 'manage_options';
      $caps = array_diff($caps, [ $manage_name ]);
    }
  }
  return $caps;
}

// if is blog page change query taxonomy by cat argument slug
function change_query_taxonomy($query) {
  if ( $query->is_home() && $query->is_main_query() && $_GET['cat'] ) {
    $query->set( 'category_name', $_GET['cat'] );
  }
}

add_action( 'pre_get_posts', 'change_query_taxonomy' );