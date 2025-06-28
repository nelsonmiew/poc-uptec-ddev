<?php
vc_map(array(
	'name' => __('Equipa', 'miew') ,
	'base' => 'vc_miew_equipa_container',
	'icon' => 'vc-miew-icon',
	'description' => __('Equipa', 'miew') ,
    'category' => __('MIEW', 'miew'),
	'content_element' => true,
	'show_settings_on_create' => false,	
));


if (class_exists('WPBakeryShortCodes')){
	class  WPBakeryShortCode_vc_miew_equipa_container extends WPBakeryShortCodes{}
}


if (!function_exists('vc_miew_equipa_container_output')){
	function vc_miew_equipa_container_output($atts, $content = null){
		$atts = extract(shortcode_atts(array() , $atts));
		
		$query = new WP_Query(array(
			'post_type' => 'equipa',
			'post_status' => 'publish',
			'orderby' => 'date',
			'order'   => 'DESC',
			'suppress_filters' => true,
			'posts_per_page' => '-1',
		));

		$parallax = json_encode(array(
            "axis" => "y",
            "fixedTil" => ".equipa_grid",
		));
		
		$innerHtml = '<div class="equipa_grid">
			<div class="d-block w-100 text-center" >
				<h2 class="team-title text-stroked glitch_text uppercase">'.__('Team', 'uncode').'</h2>
			</div>
			<div class="equipa_listings margin-top-md">';
		$i = 0;

		while ($query->have_posts()) {
			$query->the_post();
			$post_id = get_the_ID();
			$query2 = get_post_meta($post_id);

			$media_atributes = getAsyncData($post_id);
			
			$image = get_the_post_thumbnail_url($post_id);
			$title  = get_the_title($post_id);
			
			$img2 = $cargo = $linkedin = "";
			if($query2['equipa_img'][0]) $img2 = $query2['equipa_img'][0];
			if($query2['equipa_cargo'][0]) $cargo = $query2['equipa_cargo'][0];
			if($query2['equipa_linkedin'][0]) $linkedin = $query2['equipa_linkedin'][0];

			$width_img = 325;
			$height_img = 390;
			$style="margin:auto;";

			$fillSize = ($height_img/$width_img)*100;
			$fillSize = str_replace(",", ".", $fillSize);
			
			$randY = rand(100, 350);
			$invert = 0;

			if($i % 2 == 0){
				$invert = 1;
			}

			$innerHtml .= '<div class="equipa_cells">
				<figure class="equipa_divs">
					<div class="picture_holder">
						<picture class="has_bg '.$media_atributes['class'].'" data-background-image="'.$image.'" '.$media_atributes['data'].'>
							<div class="aspectRatioPlaceholder" style="'.$style.'">
								<div class="fill" style="padding-bottom: '.$fillSize.'%"></div>
							</div>
						</picture>
						<picture class="has_bg" style="background-image:url('.$img2.');"></picture>
					</div><!--
					--><figcaption class="absolute">
						<div class="w-100 d-block">
							<div class="info">
								<h4 class="extraBold">'.$title.'</h4>
								<p class="extraBold">'.$cargo.'</p>
							</div><a class="fa fa-linkedin" href="'.$linkedin.'" target="_blank"></a>
						</div>
					</figcaption>
				</figure>
			</div>'; 

			$i++;
		}

		$innerHtml .= '</div>
		</div>';
		
		return $innerHtml;
	}

	add_shortcode('vc_miew_equipa_container', 'vc_miew_equipa_container_output');
}
