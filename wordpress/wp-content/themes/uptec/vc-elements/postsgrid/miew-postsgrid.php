<?php
$categories_array = array();
$categories = get_terms('category', array('hide_empty' => false));
$categories_array['Todas'] = 0; 
foreach( $categories as $category ){
	$categories_array[$category->name] = $category->term_id; 
}


vc_map(array(
	'name' => __('Posts Grid', 'miew') ,
	'base' => 'vc_miew_postsgrid_container',
	'icon' => 'vc-miew-icon',
	'description' => __('Miew Posts Grid', 'miew') ,
    'category' => __('MIEW', 'miew'),
	'content_element' => true,
	'show_settings_on_create' => true,
	'params' => array(
		array(
			"type" => "loop",
			"heading" => __( "Listagem", "miew" ),
			"param_name" => "loopquery",
			"value" => '', 
			"description" => '',
			'admin_label' => true,
		),
	),		
));


if (class_exists('WPBakeryShortCodes')){
	class  WPBakeryShortCode_vc_miew_postsgrid_container extends WPBakeryShortCodes{}
}


if (!function_exists('vc_miew_postsgrid_container_output')){
	function vc_miew_postsgrid_container_output($atts, $content = null){
		$atts = extract(shortcode_atts(array('loopquery' => '') , $atts));
		
		$loopArray = [];
		$loopquery = explode('|', $loopquery);
		foreach($loopquery as $query){
			$query = explode(':', $query);
			$loopArray[$query[0]] = $query[1]; 
		}
		
		$postype = $loopArray['post_type'] ? $loopArray['post_type'] : 'post';
		$limit = $loopArray['size'] ? $loopArray['size'] : 3;
		$orderby = $loopArray['order_by'] ? $loopArray['order_by'] : 'menu_order';
		$order = $loopArray['order_by'] ? $loopArray['order_by'] : 'menu_order';
		$categories = $loopArray['categories'] ? $loopArray['categories'] : '';

		$offset = 0;
		
		$queryRelacionados = new WP_Query(array(
			'post_type' => $postype,
			'post_status' => 'publish',
			'orderby' => $orderby,
			'order'   => $order,
			'suppress_filters' => false,
			'posts_per_page' => $limit,
			'offset' => $offset,
			'cat' => $categories,
		));	


		if($queryRelacionados->have_posts()){
			$innerHtml = '<div class="div_100 posts_grid">
				<div class="posts_grid_title">
					<span class="title regular uppercase">'.__('Extra!', 'uncode').'</span>
					<svg viewBox="0 0 649 117" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M111.5,1.67v109h75V89.44H118.14V65.58h67.92V44.36H118.14V22.89H186.5V1.67Z" to="M112 2V111H385V89.7733H136.153V65.9143H383.384V44.6896H136.153V23.2247H385V2H112Z" stroke="white"/>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M523.3 2L508.113 78.2829L488.883 2H463.277L444.938 78.2829L429.346 2H406L430.478 111H455.843L475.878 27.4539L495.511 111H521.037L546 2H523.3Z" stroke="white"/>
						<mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="557" y="0" width="92" height="117">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M557.025 0.833008H648.365V117H557.025V0.833008Z" fill="white"/>
						</mask>
						<g mask="url(#mask0)">
							<path d="M648.365 76.8024C648.365 100.267 633.262 112 603.059 112C587.82 112 576.595 109.719 569.377 105.152C561.036 99.8449 556.919 91.0048 557.027 78.6337H581.004C581.113 86.5444 588.248 90.4998 602.415 90.4998C609.739 90.4998 615.087 89.7315 618.455 88.1891C622.41 86.3853 624.389 83.2002 624.389 78.6337C624.389 73.2734 622.41 69.9547 618.455 68.6795C616.797 67.9917 611.264 67.3807 601.853 66.8482C586.886 65.8932 576.755 64.115 571.462 61.5134C562.265 56.8939 557.669 47.9241 557.669 34.5981C557.669 21.8556 561.517 12.8858 569.216 7.68073C576.112 3.11624 587.047 0.833008 602.016 0.833008C617.145 0.833008 628.319 3.16929 635.535 7.83989C643.769 13.1491 647.887 21.9362 647.887 34.1992H624.229C624.229 25.9701 616.718 21.8556 601.695 21.8556C593.622 21.8556 588.088 22.8911 585.094 24.9621C582.794 26.5537 581.645 29.3164 581.645 33.2442C581.645 38.0209 583.624 41.0744 587.581 42.4007C589.665 43.1454 594.823 43.729 603.059 44.1534C618.722 44.9492 629.118 46.5958 634.251 49.0893C643.662 53.5496 648.365 62.7867 648.365 76.8024" stroke="white"/>
						</g>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M66.6755 2V72.9373L25.2735 2H1V111H23.3265V39.9012L64.402 111H89V2H66.6755Z" stroke="white" />
					</svg>
				</div>
				<div class="slick-postsgrid">';
					while ($queryRelacionados->have_posts()){
						$queryRelacionados->the_post();
						$extraClass = "posts_divs";
						$get_post_type = get_post_format();
						
						ob_start();
						get_template_part('content', $template);
						$innerHtml .= ob_get_clean();
					}
				$innerHtml .= '</div>
			</div>';
		}

		return $innerHtml;
	}

	add_shortcode('vc_miew_postsgrid_container', 'vc_miew_postsgrid_container_output');
}
