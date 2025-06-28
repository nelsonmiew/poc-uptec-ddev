<?php
vc_map(array(
	'name' => __('Jobs', 'miew') ,
	'base' => 'vc_miew_jobs_container',
	'icon' => 'vc-miew-icon',
	'description' => __('Listagem de trabalhos', 'miew') ,
    'category' => __('MIEW', 'miew'),
	'content_element' => true,
	'show_settings_on_create' => false,	
));


if (class_exists('WPBakeryShortCodes')){
	class  WPBakeryShortCode_vc_miew_jobs_container extends WPBakeryShortCodes{}
}


if (!function_exists('vc_miew_jobs_container_output')){
	function vc_miew_jobs_container_output($atts, $content = null){
		$atts = extract(shortcode_atts(array() , $atts));
		
		$query = new WP_Query(array(
			'post_type' => 'jobs',
			'post_status' => 'publish',
			'orderby' => 'date',
			'order'   => 'DESC',
			'suppress_filters' => false,
			'posts_per_page' => '-1',
		));

		$centros = new WP_Query(array(
			'post_type' => 'centros',
			'post_status' => 'publish',
			'orderby' => 'title',
			'order'   => 'ASC',
			'suppress_filters' => false,
			'posts_per_page' => '-1',
		));


		
		$innerHtml = '<div class="filtered_grid jobs_grid setFirst" data-action="jobs">
			<div class="filters_top">
				<div data-parent="true" class="vc_row row-container">
					<div class="row row-parent col-no-gutter no-top-padding no-bottom-padding no-h-padding full-width">
						<div class="row-inner mobile-flex">
							<div class="pos-top pos-top column_parent col-lg-2 single-internal-gutter tablet-hidden mobile-hidden"></div>
							<div class="pos-top pos-top column_parent col-lg-6 mobile-order-2 single-internal-gutter align_left_mobile align_left_tablet align_right">
								<div class="uncol">
									<div class="uncoltable">
										<div class="uncell no-block-padding">
											<div class="uncont">
												<div class="field_holder inline select">
													<select class="filter" name="center" id="center">
														<option value="0">'.__('Choose center', 'uncode').'</option>';
														while ($centros->have_posts()) {
															$centros->the_post();
															$centroTitle  = get_the_title(get_the_ID());
															$innerHtml .= '<option value=".'.strtolower(verifica_nome($centroTitle)).'">'.$centroTitle.'</option>';
														}
													$innerHtml .= '</select>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="pos-top pos-top column_parent mobile-order-1 col-lg-2 single-internal-gutter">
								<div class="field_holder fa fa-search left">
									<input class="control" type="search" name="pesq" id="pesq" placeholder="'.__('Search here', 'uncode').'" />
								</div>
							</div>
							<div class="pos-top pos-top column_parent col-lg-2 single-internal-gutter tablet-hidden mobile-hidden"></div>
						</div>
					</div>
				</div>
			</div>
			<div data-parent="true" class="vc_row row-container">
				<div class="row row-parent col-no-gutter no-top-padding no-bottom-padding no-h-padding full-width">
					<div class="row-inner">
						<div class="pos-top pos-top column_parent col-lg-2 single-internal-gutter tablet-hidden mobile-hidden"></div>
						<div class="pos-top pos-top column_parent col-lg-6 single-internal-gutter listings">
							<div class="glitch_label fail-message margin-top-sm" style="display:none;">
								<span class="subtitle glitch_label_color text-stroked glitch_label_color-stroke">'.__('No results found', 'uncode').'</span>
								<span class="subtitle glitch_label_main">'.__('No results found', 'uncode').'</span>
								<span class="glitch_label_line glitch_label_line-first"></span>
								<span class="glitch_label_line glitch_label_line-second"></span>
							</div>';
			$i = 0;
			$width_img = 200;
			$height_img = 120;
			$style="margin:auto; max-width:200px;";

			
			$fillSize = ($height_img/$width_img)*100;
			$fillSize = str_replace(",", ".", $fillSize);
			
			while ($query->have_posts()) {
				$query->the_post();
				$post_id = get_the_ID();
				$query2 = get_post_meta($post_id);
				
				$title = get_the_title($post_id);
				$link = get_the_permalink($post_id);
				$category = get_the_terms( $post_id , 'jobs-category' );

				$inicio = $fim = $empresa = $email = $link = $empresaTitle = $centroTitle = "";
				if($query2['jobs_inicio'][0]) $inicio = date_i18n( get_option( 'date_format' ), strtotime( $query2['jobs_inicio'][0]));    
				if($query2['jobs_fim'][0]) $fim = date_i18n( get_option( 'date_format' ), strtotime( $query2['jobs_fim'][0]));
				if($query2['jobs_empresa'][0]) $empresa = $query2['jobs_empresa'][0];
				if($query2['jobs_email'][0]) $email = $query2['jobs_email'][0];
				if($query2['jobs_link'][0]) $link = $query2['jobs_link'][0];

				$empresaTitle  = get_the_title($empresa);
				$centroTitle  = get_the_title(get_post_meta( $empresa, 'empresas_center', true ));
							
				$tag_ids = wp_get_post_tags( $post_id, array( 'fields' => 'ids' ) );
				if ( $tag_ids ) {
					$args = array(
						'smallest'                  => 14,
						'largest'                   => 14,
						'unit'                      => 'px',
						'include'                   => $tag_ids,
						'taxonomy'                  => 'post_tag',
						'echo'                      => false,
						'number' 					=> 999,
					);

					$tags = wp_tag_cloud($args);
				}

				$innerHtml .= '<div class="listing_divs jobs_divs mix '.strtolower(verifica_nome($centroTitle)).'" id="jobs_'.$post_id.'">
					<div data-parent="true" class="vc_row row-container">
						<div class="row row-parent col-no-gutter double-bottom-padding no-top-padding no-h-padding full-width">
							<div class="row-inner listing_list">
								<div class="pos-top pos-top column_parent col-lg-4 single-internal-gutter">
									<h5 class="extraBold">'.$inicio.'</h5>
									<h5 class="extraBold">'.$fim.'</h5>
								</div>
								<div class="pos-top pos-top column_parent col-lg-8 single-internal-gutter searcher-container">
									<h3 class="searcher extraBold">'.$title.'</h3>
									<h3 class="searcher extraBold">'.$empresaTitle.'</h3>
									<h3 class="searcher regular">'.$category[0]->name.'</h3>
									<div class="searcher tags white">'.$tags.'</div>
									<a class="searcher" href="mailto:'.$email.'">'.$email.'</a>
									<a class="button margin-top-sm show-for-mobile" href="'.$link.'" style="display: table;">'.__('Know more', 'uncode').'</a>
								</div>
							</div>
						</div>
					</div>
				</div>';

				$i++;
			}
		
		$parallax = json_encode(array(
            "axis" => "y",
            "fixedTil" => "#detail",
        ));

		$innerHtml .= '</div>
						<div class="pos-top pos-top column_parent col-lg-2 single-internal-gutter tablet-hidden mobile-hidden text-left" id="detail">

						</div>
					   	<div class="pos-top pos-top column_parent col-lg-2 single-internal-gutter tablet-hidden mobile-hidden"></div>
					</div>
				</div>
			</div>
		</div>';
		
		wp_reset_query();
		return $innerHtml;
	}

	add_shortcode('vc_miew_jobs_container', 'vc_miew_jobs_container_output');
}