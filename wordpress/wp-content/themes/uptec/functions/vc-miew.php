<?php 
function initMiewComponents(){
    /*SHARE*/
    require_once(get_stylesheet_directory().'/vc-elements/share/miew-share.php');


    /*SLIDER*/
    require_once(get_stylesheet_directory().'/vc-elements/banners/miew-banners.php');
    require_once(get_stylesheet_directory().'/vc-elements/banners/miew-banners.items.php');

    /*POSTS GRID*/
    require_once(get_stylesheet_directory().'/vc-elements/postsgrid/miew-postsgrid.php');

    /*CONTACTOS*/
    require_once(get_stylesheet_directory().'/vc-elements/contactos/miew-contactos.php');
    
    /*PROGRAMAS*/
    require_once(get_stylesheet_directory().'/vc-elements/programas/miew-programas.php');

    /*JOBS*/
    require_once(get_stylesheet_directory().'/vc-elements/jobs/miew-jobs.php');

    /*EMPRESAS*/
    require_once(get_stylesheet_directory().'/vc-elements/empresas/miew-empresas.php');

    /*EQUIPA*/
    require_once(get_stylesheet_directory().'/vc-elements/equipa/miew-equipa.php');

    /*PARCEIROS*/
    require_once(get_stylesheet_directory().'/vc-elements/parceiros/miew-parceiros.php');

    /*MAPBOX*/
    require_once(get_stylesheet_directory().'/vc-elements/mapbox/miew-mapbox.php');
    
    /*FOOTER*/
    require_once(get_stylesheet_directory().'/vc-elements/footer/miew-footer.php');

} add_action('vc_before_init', 'initMiewComponents');

/*Altera heading do single media*/
function override_widget_title($output = '', $params = array('')) {
  $extraclass = (isset($params['extraclass'])) ? " ".$params['extraclass'] : "";
  return '<h5 class="wpb_heading'.$extraclass.'">'.$params['title'].'</h5>';
} add_filter('wpb_widget_title', 'override_widget_title', 10, 2);

?>