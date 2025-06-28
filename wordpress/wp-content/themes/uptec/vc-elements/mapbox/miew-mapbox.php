<?php
vc_map(array(
	'name' => __('Mapa Centros', 'miew') ,
	'base' => 'vc_miew_centersMap_container',
	'icon' => 'vc-miew-icon',
	'description' => __('Lista de centersMap', 'miew') ,
  'category' => __('MIEW', 'miew'),
	'content_element' => true,
	'show_settings_on_create' => false,	
));


if (class_exists('WPBakeryShortCodes')){
	class  WPBakeryShortCode_vc_miew_centersMap_container extends WPBakeryShortCodes{}
}


if (!function_exists('vc_miew_centersMap_container_output')){
	function vc_miew_centersMap_container_output($atts, $content = null){
		$atts = extract(shortcode_atts(array() , $atts));
				
		$innerHtml = '<div id="centersPage">
			<div id="centersMap"></div>
			<div id="centersDetail" class="centers-close-area has_bg grayscale">
				<div class="centersBox">
					<div>
						<div id="centerDesc"><p></p></div>
						<div id="centerAddress" class="extraBold margin-top-sm"></div>
						<a href="javascript:;" class="button margin-top-sm">'.__('Close', 'uncode').'</a>
					</div>
				</div>
			</div>
		</div>';
		
		return $innerHtml;
	}

	add_shortcode('vc_miew_centersMap_container', 'vc_miew_centersMap_container_output');
}
