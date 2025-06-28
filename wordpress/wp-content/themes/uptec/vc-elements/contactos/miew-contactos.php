<?php
vc_map(array(
	'name' => __('Contactos', 'miew') ,
	'base' => 'vc_miew_contactos_container',
	'icon' => 'vc-miew-icon',
	'description' => __('Lista de contactos', 'miew') ,
    'category' => __('MIEW', 'miew'),
	'content_element' => true,
	'show_settings_on_create' => false,	
));


if (class_exists('WPBakeryShortCodes')){
	class  WPBakeryShortCode_vc_miew_contactos_container extends WPBakeryShortCodes{}
}


if (!function_exists('vc_miew_contactos_container_output')){
	function vc_miew_contactos_container_output($atts, $content = null){
		$atts = extract(shortcode_atts(array() , $atts));
		
		$query = new WP_Query(array(
			'post_type' => 'contactos',
			'post_status' => 'publish',
			'orderby' => 'menu_order',
			'order'   => 'ASC',
			'suppress_filters' => true,
			'posts_per_page' => '-1',
		));
		
		$innerHtml = '<div class="contactos_grid">';
			$i = 0;
			while ($query->have_posts()) {
				$query->the_post();
				$post_id = get_the_ID();
				
				$title  = get_the_title($post_id);
				$description  = get_the_content($post_id);
				$rand = rand(5, 20);
				$rand2 = rand(10, 30);

				$innerHtml .= '<div class="contactos_divs" data-min-ty="-'.$rand.'" data-max-ty="'.$rand.'" data-cty="'.$rand2.'">
					<h5 class="listing_subtitle"><strong>'.$title.'</strong></h5>
					<div class="listing_subtitle">'.nl2br($description).'</div>
				</div>';

				$i++;
			}
		$innerHtml .= '</div>';
		wp_reset_query();
		return $innerHtml;
	}
	
	add_shortcode('vc_miew_contactos_container', 'vc_miew_contactos_container_output');
}
