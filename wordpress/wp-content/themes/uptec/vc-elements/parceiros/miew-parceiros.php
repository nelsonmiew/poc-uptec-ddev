<?php
vc_map(array(
	'name' => __('Parceiros', 'miew') ,
	'base' => 'vc_miew_parceiros_container',
	'icon' => 'vc-miew-icon',
	'description' => __('Parceiros', 'miew') ,
    'category' => __('MIEW', 'miew'),
	'content_element' => true,
	'show_settings_on_create' => false,	
));


if (class_exists('WPBakeryShortCodes')){
	class  WPBakeryShortCode_vc_miew_parceiros_container extends WPBakeryShortCodes{}
}


if (!function_exists('vc_miew_parceiros_container_output')){
	function vc_miew_parceiros_container_output($atts, $content = null){
		$atts = extract(shortcode_atts(array() , $atts));
		
		$query = new WP_Query(array(
			'post_type' => 'parceiros',
			'post_status' => 'publish',
			'orderby' => 'date',
			'order'   => 'ASC',
			'suppress_filters' => true,
			'posts_per_page' => '-1',
		));

		$svg = file_get_contents('../img/uptec.svg');
		
		$innerHtml = '<div class="parceiros_grid">
			<div class="parceiros-slick">';

			$total = $query->post_count;
			$i = 0;
			while ($query->have_posts()) {
				$query->the_post();
				$post_id = get_the_ID();
				$query2 = get_post_meta($post_id);


				$media_atributes = getAsyncData($post_id);
				
				$image = get_the_post_thumbnail_url($post_id);
				$title  = get_the_title($post_id);
				$permalink = "javascript:;";
				if($query2['parceiros_link'][0]) $permalink = $query2['parceiros_link'][0];
			
				$content = '<picture class="has_bg contain'.$media_atributes['class'].'" alt="'.$title.'" title="'.$title.'" data-background-image="'.$image.'" '.$media_atributes['data'].'></picture>';
				if(!$image){
					$content = '<figcaption><h3>'.$title.'</h3></figcaption>';
				}

				$innerHtml .= '<figure class="parceiros_divs">
					'.$content.'
					<a class="linker" href="'.$permalink.'" target="_blank"></a>
				</figure>'; 
				
				if($total-$i == 3){
					$innerHtml .= '<figure class="parceiros_divs"><a class="button-big" href="https://uptec.up.pt/apply"><svg viewBox="0 0 36 36"><path stroke-dasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/></svg><span>You</span></a></figure>';
				} 

				$i++;
			}
		$innerHtml .= '</div>
			<svg class="building" viewBox="0 0 1183 733" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M1092.01 603.884C1194.45 589.879 1337.66 557.939 1372.55 510.029C1396.62 477.107 1363.21 449.835 1347.49 439.761C1297.13 407.576 1258.32 399.468 1223.43 390.623C1187.81 381.778 1092.74 363.105 1048.52 356.963C973.598 346.644 909.235 341.485 876.071 346.398C859.612 348.855 833.818 354.998 812.2 363.597C790.582 372.196 779.528 365.562 779.528 365.562C779.528 365.562 763.56 361.14 738.257 312.247C712.954 263.355 694.038 274.165 694.038 274.165C678.807 275.393 617.884 342.467 617.884 342.467C617.884 342.467 568.752 387.92 537.308 398.977C505.864 410.033 496.774 394.554 491.37 383.744C485.72 372.442 483.509 367.037 476.63 335.834C469.752 304.631 460.663 145.914 460.663 145.914C457.96 49.6025 439.536 15.2057 421.357 3.90384C418.901 2.42969 399.739 -11.3291 371.734 37.3179C343.729 85.965 316.461 243.454 307.371 313.721C301.967 355.243 292.632 460.399 269.294 477.107C245.957 493.814 243.5 472.684 227.532 411.998C227.532 411.998 219.18 368.265 207.88 436.567C204.686 455.486 196.825 485.214 220.163 512.732C243.5 540.249 354.538 571.698 401.95 582.754C479.578 600.935 633.852 614.94 739.731 617.151C827.677 619.116 946.576 623.539 1092.01 603.884Z" stroke="#ACACAC"/>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M173.356 399.641C189.075 354.208 215.847 248.853 223.215 213.735C230.583 178.616 270.372 30.5294 321.213 12.8474C370.09 -4.34338 382.861 60.7362 383.598 89.4694C384.335 118.203 385.317 344.139 424.615 389.081C463.912 434.023 581.805 332.597 581.805 332.597C581.805 332.597 644.927 270.219 681.031 265.798C717.136 261.378 741.943 344.876 771.416 351.752C800.889 358.629 852.958 339.964 852.958 339.964C852.958 339.964 905.764 324.001 1014.57 337.509C1014.57 337.509 1263.86 362.558 1344.18 386.625C1424.49 410.692 1529.37 442.618 1573.82 486.823C1602.31 515.065 1601.09 554.113 1588.56 571.549C1551.96 623.122 1465.02 658.486 1390.6 675.677C1282.04 700.726 1145.23 723.811 1018.01 728.723C890.782 733.634 655.242 734.371 545.7 721.355C435.913 708.339 263.249 686.974 186.374 657.504C109.498 628.034 5.35926 585.548 1.4295 532.993C-2.50025 480.438 21.3239 446.793 40.727 417.569C53.0075 398.904 83.2175 388.59 89.1121 448.512C95.9892 521.205 159.111 440.162 173.356 399.641Z" stroke="#ACACAC"/>
			</svg>

		</div>';
		
		return $innerHtml;
	}

	add_shortcode('vc_miew_parceiros_container', 'vc_miew_parceiros_container_output');
}
