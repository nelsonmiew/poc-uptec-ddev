<?php
vc_map(array(
	'name' => __('Programas', 'miew') ,
	'base' => 'vc_miew_programas_container',
	'icon' => 'vc-miew-icon',
	'description' => __('Lista de programas', 'miew') ,
    'category' => __('MIEW', 'miew'),
	'content_element' => true,
	'show_settings_on_create' => false,	
));


if (class_exists('WPBakeryShortCodes')){
	class  WPBakeryShortCode_vc_miew_programas_container extends WPBakeryShortCodes{}
}


if (!function_exists('vc_miew_programas_container_output')){
	function vc_miew_programas_container_output($atts, $content = null){
		$atts = extract(shortcode_atts(array() , $atts));
		
		$query = new WP_Query(array(
			'post_type' => 'programas',
			'post_status' => 'publish',
			'orderby' => 'modified',
			'suppress_filters' => false,
			'posts_per_page' => '-1',
		));
		
		$innerHtml = '<div class="programas_grid">';
			$i = 0;
			while ($query->have_posts()) {
				$query->the_post();
				$post_id = get_the_ID();
				$query2 = get_post_meta($post_id);

				$media_atributes = getAsyncData($post_id);
				
				$image = get_the_post_thumbnail_url($post_id);
				$title  = get_the_title($post_id);
				$description  = get_the_content($post_id);
				$post_type = get_post_type($post_id);

				$data = $link = "";
				if($query2['programas_data'][0]) $data = $query2['programas_data'][0];
				if($query2['programas_link'][0]) $link = $query2['programas_link'][0];

				$width_img = 815;
				$height_img = 490;
				$style="margin:auto;";

				$fillSize = ($height_img/$width_img)*100;
				$fillSize = str_replace(",", ".", $fillSize);

				$style_class="";
				if(strlen($data)>8){
					$style_class="style='max-width:100%;'";
				}

				$innerHtml .= '<figure class="programas_divs margin-top-lg">
					<picture class="has_bg elements_animated top '.$media_atributes['class'].'" data-background-image="'.$image.'" '.$media_atributes['data'].'>
						<div class="aspectRatioPlaceholder" style="'.$style.'">
							<div class="fill" style="padding-bottom: '.$fillSize.'%"></div>
						</div>
					</picture><!--
					--><figcaption class="elements_animated bottom">
						<span '.$style_class.'>'.$data.'</span>
						<h2 class="title uppercase text-stroked margin-bottom-sm">'.$title.'</h2>
						<p class="bold">'.nl2br(strip_tags($description)).'</p>
						<a class="button-big" href="'.$link.'" target="_blank">
							<svg viewBox="0 0 36 36">
								<path stroke-dasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
							</svg>
							<span>'.__('Know more', 'uncode').'</span>
						</a>
					</figcaption>
				</figure>';

				$i++;
			}
		$innerHtml .= '</div>';
		
		wp_reset_query();
		return $innerHtml;
	}

	add_shortcode('vc_miew_programas_container', 'vc_miew_programas_container_output');
}
