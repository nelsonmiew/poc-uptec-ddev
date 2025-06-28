<?php
vc_map(array(
	'name' => __('Miew Slider', 'miew') ,
	'base' => 'vc_miew_slider_container',
	'icon' => 'vc-miew-icon',
	'description' => __('Miew Slider', 'miew') ,
    'category' => __('MIEW', 'miew'),
	'as_parent' => array(
		'only' => 'vc_miew_slider_item'
	), 
	'content_element' => true,
	'show_settings_on_create' => true,
	'params' => array(
		array( 
			'type' => 'checkbox',				
			'heading' => __( 'Scroll Arrow', 'miew' ),				
			'param_name' => 'has_arrow',							
			'admin_label' => false,
			'group' => 'General',
		),
		array(
			'type' => 'textfield',				
			'heading' => __( 'Extra CSS Class', 'miew' ),				
			'param_name' => 'extracssclass',							
			'admin_label' => false,
			'group' => 'General',
		),
		array( 
			'type' => 'checkbox',				
			'heading' => __( 'Fullscreen', 'miew' ),				
			'param_name' => 'fullscreen',							
			'admin_label' => false,
			'group' => 'Desktop',
		),
		array( 
			'type' => 'textfield',				
			'heading' => __( 'Tamanho das imagens', 'miew' ),		
			'description' => __( 'Apenas funciona para banners que não sejam fullscreen. Default: 1920x920', 'miew' ),				
			'param_name' => 'imagesize',							
			'admin_label' => false,
			'group' => 'Desktop',
		),
		array( 
			'type' => 'checkbox',				
			'heading' => __( 'Dots', 'miew' ),				
			'param_name' => 'dots',							
			'admin_label' => false,
			'group' => 'Desktop',
		),
		array( 
			'type' => 'checkbox',				
			'heading' => __( 'Arrows', 'miew' ),				
			'param_name' => 'arrows',							
			'admin_label' => false,
			'group' => 'Desktop',
		),
		array( 
			'type' => 'checkbox',				
			'heading' => __( 'Fullscreen', 'miew' ),				
			'param_name' => 'fullscreen2',							
			'admin_label' => false,
			'group' => 'Mobile',
		),
		array( 
			'type' => 'textfield',				
			'heading' => __( 'Tamanho das imagens', 'miew' ),		
			'description' => __( 'Apenas funciona para banners que não sejam fullscreen. Default: 1000x600', 'miew' ),				
			'param_name' => 'imagesize2',							
			'admin_label' => false,
			'group' => 'Mobile',
		),
		array( 
			'type' => 'checkbox',				
			'heading' => __( 'Dots', 'miew' ),				
			'param_name' => 'dots2',							
			'admin_label' => false,
			'group' => 'Mobile',
		),
		array( 
			'type' => 'checkbox',				
			'heading' => __( 'Arrows', 'miew' ),				
			'param_name' => 'arrows2',							
			'admin_label' => false,
			'group' => 'Mobile',
		),
	),		
	"js_view" => 'VcColumnView'
));

if (class_exists('WPBakeryShortCodesContainer')){
	class  WPBakeryShortCode_vc_miew_slider_container extends WPBakeryShortCodesContainer{}
}


if (!function_exists('vc_miew_slider_container_output')){
	function vc_miew_slider_container_output($atts, $content = null){
		$atts = extract(shortcode_atts(array( 'fullscreen' => '', 'fullscreen2' => '', 'imagesize' => '', 'imagesize2' => '', 'has_arrow' => '', 'dots' => '', 'arrows' => '', 'dots2' => '', 'arrows2' => '', 'extracssclass' => ''
		) , $atts));
		
		$bannerId = 'banner-'.rand();
		
		$bannerClasses = $fullscreen ? (' fullscreen') : '';
		$bannerClasses .= $fullscreen2 ? (' fullscreen-mobile') : '';
		$bannerClasses .= $dots ? (' has_dots') : '';
		$bannerClasses .= $arrows ? (' has_arrows') : '';
		$bannerClasses .= $dots2 ? (' has_dots_mobile') : '';
		$bannerClasses .= $arrows2 ? (' has_arrows_mobile') : '';
		$bannerClasses .= $extracssclass != "" ? (' '.$extracssclass) : '';

		if(!$fullscreen){
			$imagesize = explode("x", $imagesize);

			$width_img = $imagesize[0] ? $imagesize[0] : 1920;
			$height_img = $imagesize[1] ? $imagesize[1] : 920;

			$fillSize = ($height_img/$width_img)*100;
			$fillSize = str_replace(",", ".", $fillSize);

			$style="margin:auto;";
		}
		
		if(!$fullscreen2){
			$imagesize2 = explode("x", $imagesize2);

			$width_img2 = $imagesize2[0] ? $imagesize2[0] : 1000;
			$height_img2 = $imagesize2[1] ? $imagesize2[1] : 600;

			$fillSize_mob = ($height_img2/$width_img2)*100;
			$fillSize_mob = str_replace(",", ".", $fillSize_mob);
			
			$style_mob="margin:auto; min-height:250px";
		}

		$hasArrow = $has_arrow != false;
		$goTo = "goTo($('.banners').parents('.row-container').next('div'))";

		$innerHtml = '<div class="banners'.$bannerClasses.'">
			<div id="'.$bannerId.'" class="slick-banners full_height">';			

		$arrowHtml = '<div class="banners-arrow" onClick="'.$goTo.'"></div>';

		$shortcodeXmlRaw = '<items>'.do_shortcode($content).'</items>';
		$shortcodeXml = simplexml_load_string($shortcodeXmlRaw);
		
		
		foreach ($shortcodeXml->item as $slide) {
			$title = html_entity_decode($slide->attributes()["itemtitle"]);
			$text = html_entity_decode($slide->attributes()["itemtext"]);
			$src = $slide->attributes()["src"];
			$src2 = $slide->attributes()["src2"];
			$video = $slide->attributes()["video"];
			$linktext = $slide->attributes()["linktext"];
			$link = $slide->attributes()["link"];
			$linktarget = $slide->attributes()["linktarget"] == true ? '_blank' : '_self';
			$parallax = $slide->attributes()["parallax"];
			$parallax_classes = [];

			if($parallax === true){
				$parallax_classes['container'] = " parallax-herobg-holder";
				$parallax_classes['holder'] = " parallax-herobg";
				$parallax_classes['img'] = " herobg";
			}

			if($src != "" || $video != ""){
				if($src != ""){
					$img_banners="";
					
					if($src2!= ""){
                        $img_banners=$src2;
                    }else{
                        $img_banners=$src;
                    }

					$innerHtml .= '<div class="banners_slide'.$parallax_classes['container'].'">
						<div class="banner_container'.$parallax_classes['holder'].'">
							<div class="banners_img has_bg'.$parallax_classes['img'].'" bg-srcset="'.$img_banners.' 960w align_center_center, '.$src.' align_center_center">';
								if(!$fullscreen){
									$innerHtml .= '<div class="aspectRatioPlaceholder show-for-desktop" style="'.$style.'">
										<div class="fill" style="padding-bottom: '.$fillSize.'%"></div>
									</div>';
								} 
								if(!$fullscreen2){
									$innerHtml .= '<div class="aspectRatioPlaceholder show-for-mobile" style="'.$style_mob.'">
									<div class="fill" style="padding-bottom: '.$fillSize_mob.'%"></div>
								</div>';
								} 
							$innerHtml .= '</div>
							<figcaption class="banner_content'.$parallax_classes['img'].'">';
								if ($title != "" ){
									$innerHtml .= '<h2 class="slide-title">'.$title.'</h2>';
								}
								if ($text != "" ){
									$innerHtml .= '<p class="slide-text">'.$text.'</p>';
								}
								if($linktext!="" && $link!=""){
									$innerHtml .= '<a href="'.$link.'" target="'.$linktarget.'" class="button">'.$linktext.' <i class="fa fa-arrow-right2"></i></a>';
								}                              
							$innerHtml .= '</figcaption>
						</div> 
					</div>';
				}else if($video != ""){
					$class="";

					if(strstr($video, "youtube") || strstr($video, "youtu.be")){
						$class=" youtube full";
					}elseif(strstr($video, "vimeo")){
						$class=" vimeo full";
					}else{
						$class = "iframe";
					}

					$innerHtml .= '<div style="position:relative;">';
						if($class=="iframe"){
							$innerHtml .= '<iframe src="'.$video.'" allowfullscreen width="854" height="480" frameborder="0"></iframe>';
						}else{
							$innerHtml .= '<div class="video_frame absolute '.$class.'" data-vid="'.$video.'"></div>';
						}  
					$innerHtml .= '</div>';
				}			
			}
		}
		
		$innerHtml .= '</div>';
		$innerHtml .= $hasArrow ? $arrowHtml : '';
		$innerHtml .= '</div>';

		

		return $innerHtml;
	}

	add_shortcode('vc_miew_slider_container', 'vc_miew_slider_container_output');
}
