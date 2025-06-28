<?php
vc_map(array(
	'name' => __('Empresas', 'miew') ,
	'base' => 'vc_miew_empresas_container',
	'icon' => 'vc-miew-icon',
	'description' => __('Listagem de trabalhos', 'miew') ,
    'category' => __('MIEW', 'miew'),
	'content_element' => true,
	'show_settings_on_create' => false,	
	'params' => array(
		array(
			'type' => 'dropdown',
			'heading' => __( 'Tipo',  'miewtheme' ),
			'param_name' => 'tipo',
			'value' => array(
				"Empresas" => 'empresas',
				"Alumni" => 'alumni',
			),
			"std" => "empresas"
		),
	)
));


if (class_exists('WPBakeryShortCodes')){
	class  WPBakeryShortCode_vc_miew_empresas_container extends WPBakeryShortCodes{}
}


if (!function_exists('vc_miew_empresas_container_output')){
	function vc_miew_empresas_container_output($atts, $content = null){
		$atts = extract(shortcode_atts(array('tipo'=>'empresas') , $atts));
		
		$query = new WP_Query(array(
			'post_type' => 'empresas',
			'post_status' => 'publish',
			'orderby' => 'title',
			'order'   => 'ASC',
			'suppress_filters' => false,
			'posts_per_page' => '-1',
			'meta_query'     => array(
				array(
					'key'       => 'empresas_alumni',
					'compare'   => $tipo == "empresas" ? 'NOT EXISTS' : 'EXISTS',
				)
			),
		));

		$centerFilter = $alumni_text = "";
		if($tipo == "empresas"){
			$centros = new WP_Query(array(
				'post_type' => 'centros',
				'post_status' => 'publish',
				'orderby' => 'title',
				'order'   => 'ASC',
				'suppress_filters' => false,
				'posts_per_page' => '-1',
			));

			$centerFilter = '<div class="field_holder inline select">
				<select class="filter light" name="center" id="center">
					<option value="0">'.__('Choose center', 'uncode').'</option>';
					while ($centros->have_posts()) {
						$centros->the_post();
						$centroTitle  = get_the_title(get_the_ID());
						$centerFilter .= '<option value=".'.strtolower(verifica_nome($centroTitle)).'">'.$centroTitle.'</option>';
					}
				$centerFilter .= '</select>
			</div>';
		}else{
			$alumni_text = '<div data-parent="true" class="vc_row row-container margin-bottom-sm" data-section="2">
				<div class="row row-parent col-no-gutter no-top-padding no-bottom-padding no-h-padding full-width" data-imgready="true">
					<div class="row-inner">
						<div class="pos-top pos-top column_parent col-lg-2 single-internal-gutter tablet-hidden mobile-hidden"></div>
						<div class="pos-top pos-top column_parent col-lg-6 single-internal-gutter">
							<div class="uncol style-light">
								<div class="uncoltable">
									<div class="uncell no-block-padding">
										<div class="uncont">
											<div class="heading-text el-text">
													<h4 class="h4 font-weight-700 text-uppercase"><span>Alumni</span></h4>
											</div>
											<div class="clear"></div>
											<div class="uncode_text_column" style="max-width: 680px;">
													<p>'.__('As an Alumni you keep being a part withing the UPTEC family. Members of our Alumni – network receive our Alumni-Newsletter and our Alumni magazine and have the possibility to take part in several events!', 'uncode').'</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="pos-top pos-top column_parent col-lg-2 single-internal-gutter tablet-hidden mobile-hidden"></div>
						<div class="pos-top pos-top column_parent col-lg-2 single-internal-gutter tablet-hidden mobile-hidden"></div>
						<script id="script-420741" data-row="script-420741" type="text/javascript">
								if (typeof UNCODE !== "undefined") UNCODE.initRow(document.getElementById("script-420741"));
								
						</script>
					</div>
				</div>
			</div>';
		}

		
		$innerHtml = '<div class="filtered_grid empresas_grid" data-action="empresas">
			<div class="filters_top">
				<div data-parent="true" class="vc_row row-container">
					<div class="row row-parent col-no-gutter no-top-padding no-bottom-padding no-h-padding full-width">
						<div class="row-inner mobile-flex">
							<div class="pos-top pos-top column_parent col-lg-2 single-internal-gutter tablet-hidden mobile-hidden"></div>
							<div class="pos-center pos-middle column_parent col-lg-6 mobile-order-2 single-internal-gutter align_left_mobile align_left_tablet align_right">
								<div class="uncol style-light">
									<div class="uncoltable">
										<div class="uncell no-block-padding">
											<div class="uncont">
												<div class="listSwitcher inline-filter">
													<a href="javascript:;" data-switch="grid" class="fa fa-th-large active" alt="'.__('Grid','uncode').'" title="'.__('Grid','uncode').'"></a>
													<a href="javascript:;" data-switch="list" class="fa fa-list" alt="'.__('Listing','uncode').'" title="'.__('Listing','uncode').'"></a>
												</div>
												'.$centerFilter.'
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="pos-top pos-top column_parent mobile-order-1 col-lg-2 single-internal-gutter">
								<div class="field_holder fa fa-search left">
									<input class="control light" type="search" name="pesq" id="pesq" placeholder="'.__('Search here', 'uncode').'" />
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
				
				$title  = get_the_title($post_id);
				$link  = get_the_permalink($post_id);

				$logo = $center = $centroTitle = $agencia = $email = $contacto = $site = $alumni = $tags_class = "";
				if($query2['empresas_logotipo'][0]) $logo = $query2['empresas_logotipo'][0];    
				if($query2['empresas_center'][0]) $center = $query2['empresas_center'][0];
				if($query2['empresas_agencia'][0]) $agencia = $query2['empresas_agencia'][0];
				if($query2['empresas_alumni'][0]) $alumni = $query2['empresas_alumni'][0]==="on" ? 'alumni' : '';   
				if($query2['empresas_email'][0]) $email = $query2['empresas_email'][0];
				if($query2['empresas_contacto'][0]) $contacto = $query2['empresas_contacto'][0];
				if($query2['empresas_link'][0]) $site = $query2['empresas_link'][0];

				$media_atributes = getAsyncData('', attachment_url_to_postid($logo));
	
				$tags = "";
				$tag_ids = wp_get_post_tags( $post_id, array( 'fields' => 'ids' ) );
				if ( $tag_ids ) {
					$args = array(
						'smallest'                  => 14,
						'largest'                   => 14,
						'unit'                      => 'px',
						'include'                   => $tag_ids,
						'taxonomy'                  => 'post_tag',
						'echo'                      => false,
						'number' 										=> 999,
					);

					// foreach($tag_ids as $tag){
					// 	$tags_class.= get_term_by('id', $tag, 'post_tag')->slug." ";
					// }

					// $tags_class=substr($tags_class, 0, -1);

					$tags = wp_tag_cloud($args);
				}
				
				if($center!=""){
					$centros = new WP_Query(array(
						'post_type' => 'centros',
						'post_status' => 'publish',
						'p' => $center,
						'orderby' => 'menu_order',
						'order'   => 'ASC',
						'suppress_filters' => false,
						'posts_per_page' => '-1',
					));
					while ($centros->have_posts()) {
						$centros->the_post();
						$centroTitle  = get_the_title(get_the_ID());
					}
				}

				$innerHtml .= '<div class="listing_divs grid empresas_divs mix '.strtolower(verifica_nome($centroTitle)).' '.$alumni.$tags_class.'" id="empresas_'.$post_id.'">
					<div data-parent="true" class="vc_row row-container">
						<div class="row row-parent col-no-gutter double-bottom-padding no-top-padding no-h-padding full-width">
							<div class="row-inner listing_list hidden">
								<div class="pos-top pos-top column_parent col-lg-4 single-internal-gutter">
									<h5 class="extraBold">'.$centroTitle.'</h5>
								</div>
								<div class="pos-top pos-top column_parent col-lg-8 single-internal-gutter searcher-container">
									<h3 class="searcher extraBold">'.$title.'</h3>
									<h3 class="searcher regular">'.$agencia.'</h3>
									<h3 class="searcher regular hidden">'.$tags.'</h3>
									<a class="button margin-top-sm show-for-mobile" href="'.$link.'" style="display: table;">'.__('Know more', 'uncode').'</a>
								</div>
							</div>
							<div class="row-inner listing_grid">
								<div class="pos-top pos-top column_parent col-12 single-internal-gutter">
									<figure>
										<picture class="has_bg grayscale contain" data-background-image="'.$logo.'">
											<a href="javascript:;" class="aspectRatioPlaceholder" style="'.$style.'">
												<div class="fill" style="padding-bottom: '.$fillSize.'%"></div>
											</a>
										</picture>
										<figcaption class="absolute show-for-mobile">
											<a class="linker" href="'.$link.'"></a>
										</figcaption>
									</figure>
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

		$blockContent = uncode_remove_p_tag(do_shortcode(get_post_field('post_content', 796)));
		$innerHtml .= '</div>
						<div class="pos-top pos-top column_parent col-lg-2 single-internal-gutter tablet-hidden mobile-hidden text-left" id="detail">
							<div class="detail_div empresas_detalhe" id="empresa_0" data-parallax='.$parallax.'>'.$blockContent.'</div>
						</div>
					   	<div class="pos-top pos-top column_parent col-lg-2 single-internal-gutter tablet-hidden mobile-hidden"></div>
					</div>
				</div>
			</div>
		</div>';
		
		wp_reset_query();
		return $innerHtml;
	}

	add_shortcode('vc_miew_empresas_container', 'vc_miew_empresas_container_output');
}