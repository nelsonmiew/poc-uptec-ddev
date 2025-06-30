<?php
vc_map(array(
	'name' => __('Footer', 'miew') ,
	'base' => 'vc_miew_footer_container',
	'icon' => 'vc-miew-icon',
	'description' => __('Lista de footer', 'miew') ,
    'category' => __('MIEW', 'miew'),
	'content_element' => true,
	'show_settings_on_create' => false,
));


if (class_exists('WPBakeryShortCodes')){
	class  WPBakeryShortCode_vc_miew_footer_container extends WPBakeryShortCodes{}
}


if (!function_exists('vc_miew_footer_container_output')){
	function vc_miew_footer_container_output($atts, $content = null){
		$atts = extract(shortcode_atts(array() , $atts));
		
		for($i=0; $i < 10; $i++){ 
			if($i%2 == 0){
				$links .= '<div class="announcements"><a class="listing_text uppercase" href="javascript:;" onClick="openNewsletter()">'.__('Get all the latest news about uptec', 'uncode').'</a></div>';
			}else{
				$links .= '<div class="announcements"><a class="listing_text uppercase" href="javascript:;" onClick="openNewsletter()">'.__('CLICK TO SUBSCRIBE TO OUR NEWSLETTER', 'uncode').'</a></div>';
			}
		}
		$innerHtml = '<div class="announcements_wrapper">https://uptec.up.pt/be-part
			<div class="announcements_slide">
				<div class="announcements_content">	
					'.$links.'
				</div>
			</div>
		</div><div class="newsletter_wrapper">
			'.do_shortcode('[newsletter_form form="1"]').'
		</div>';

		return $innerHtml;
	}
	
	add_shortcode('vc_miew_footer_container', 'vc_miew_footer_container_output');
}
