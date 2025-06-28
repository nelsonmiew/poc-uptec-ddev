<?php

vc_map(array(
	'name' => __('Slider Item', 'miew') ,
	'base' => 'vc_miew_slider_item',
	'icon' => 'vc-miew-icon',
	'description' => __('Slider Item', 'miew') ,
    'category' => __('MIEW', 'miew'),
	'content_element' => true,
	'as_parent' => array(
		'only' => ''
	) ,
	'as_child' => array(
		'only' => 'vc_miew_slider_container'
	) ,
	'show_settings_on_create' => true,
	'params' => array(
		array(
			"type" => "attach_image",
			"heading" => __("Image Desktop", "miew"),
			"param_name" => "img01",
			'admin_label' => true,	
		),
		array(
			"type" => "attach_image",
			"heading" => __("Image Mobile", "miew"),
			"param_name" => "img02",
			'admin_label' => true,	
		),
		array(
			'type' => 'textfield',
			'heading' => __( 'Video', 'miew' ),
			'param_name' => 'video',	
			'description' => __( 'Video Link (replaces content). Exemplo https://youtu.be/###########', 'miew' ),
			'admin_label' => true,
		),
		array(
			'type' => 'textfield',
			'heading' => __( 'Title', 'miew' ),
			'param_name' => 'itemtitle',	
			'description' => __( 'text', 'miew' ),
			'admin_label' => true,
		),
		array(
			'type' => 'textarea',
			'heading' => __( 'Text', 'miew' ),
			'param_name' => 'itemtext',	
			'description' => __( 'text', 'miew' ),
			'admin_label' => true,
		),
		array(
			'type' => 'vc_link',
			'param_name' => 'link',	
			'heading' => __( 'Link', 'miew' ),
			'description' => __( 'External Link (needs link text)', 'miew' ),
			'admin_label' => true,
		),
		array( 
			'type' => 'checkbox',				
			'heading' => __( 'Parallax?', 'miew' ),				
			'param_name' => 'parallax',							
			'admin_label' => true,
		)
	),	
));


if (class_exists('WPBakeryShortCode')){
	class  WPBakeryShortCode_vc_miew_slider_item extends WPBakeryShortCode{
	}
}

if (!function_exists('vc_miew_slider_item_output')){
	function vc_miew_slider_item_output($atts, $content = null){
		
		$atts = extract(shortcode_atts(array( 'img01'=> '', 'img02'=> '', 'video'=> '', 'itemtitle' => '', 'itemtext' => '', 'link' => '', 'parallax' => ''       
		) , $atts));
		
		$innerHtml = '';

		$linkParts = explode("|", urldecode($link));

		$linktext = explode(":", $linkParts[1]);
		$linktarget = explode(":", $linkParts[2]);
		$link = explode("url:", $linkParts[0]);

		$link = $link[1];
		$linktext = $linktext[1];
		$linktarget = $linktarget[1];

		$attachment_meta = wp_prepare_attachment_for_js($img01);		
		$attachment_meta2 = wp_prepare_attachment_for_js($img02);

		$img1_url = $attachment_meta["sizes"]["full"]["url"] ? $attachment_meta["sizes"]["full"]["url"] : '';
		$img2_url = $attachment_meta2["sizes"]["full"]["url"] ? $attachment_meta2["sizes"]["full"]["url"] : '';
		$alt = $attachment_meta["alt"] ? $attachment_meta["alt"] : '';
		
		$content = '<item src="'.$img1_url.'" src2="'.$img2_url.'" video="'.htmlspecialchars($video).'" itemtitle="'.htmlspecialchars($itemtitle).'" itemtext="'.htmlspecialchars(nl2br($itemtext)).'" link="'.$link.'" linktext="'.$linktext.'" linktarget="'.$linktarget.'" parallax="'.$parallax.'"></item>';	

		return do_shortcode($content);	
	}

	add_shortcode('vc_miew_slider_item', 'vc_miew_slider_item_output');
}
?>