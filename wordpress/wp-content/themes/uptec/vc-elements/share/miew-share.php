<?php
vc_map(array(
	'name' => __('Share Links', 'miew') ,
	'base' => 'vc_miew_shareLinks_container',
	'icon' => 'vc-miew-icon',
	'description' => __('Lista de redes sociais', 'miew') ,
    'category' => __('MIEW', 'miew'),
	'content_element' => true,
	'show_settings_on_create' => false,	
));


if (class_exists('WPBakeryShortCodes')){
	class  WPBakeryShortCode_vc_miew_shareLinks_container extends WPBakeryShortCodes{}
}


if (!function_exists('vc_miew_shareLinks_container_output')){
	function vc_miew_shareLinks_container_output($atts, $content = null){
		$atts = extract(shortcode_atts(array() , $atts));
		$socials = ot_get_option( '_uncode_social_list');
		$innerHtml = $iconsList = "";

		if (!empty($socials)) {
			foreach ($socials as $social) {
				$iconsList .= '<li class="menu-item-link social-icon '.$social['_uncode_social_unique_id'].'"><a href="'.$social['_uncode_link'].'" target="_blank"><i class="'.$social['_uncode_social'].'"></i></a></li>';
			}

			$innerHtml = '<ul class="social-list">'.$iconsList.'</ul>';
		}
		
		
		return $innerHtml;
	}

	add_shortcode('vc_miew_shareLinks_container', 'vc_miew_shareLinks_container_output');
}
