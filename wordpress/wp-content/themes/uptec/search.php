<?php
/**
 * The template for displaying Search Results pages.
 *
 * @package uncode
 */

get_header();

/**
 * DATA COLLECTION - START
 *
 */

/** Init variables **/
$limit_width = $limit_content_width = $the_content = $main_content = $layout = $sidebar_style = $sidebar_bg_color = $sidebar = $sidebar_size = $sidebar_sticky = $sidebar_padding = $sidebar_inner_padding = $sidebar_content = $navigation_content = $page_custom_width = $row_classes = $main_classes = $footer_classes = $generic_body_content_block = '';

$post_type = 'search_index';

/** Get general datas **/
$style = ot_get_option('_uncode_general_style');
$bg_color = ot_get_option('_uncode_general_bg_color');
$bg_color = ($bg_color == '') ? ' style-'.$style.'-bg' : ' style-'.$bg_color.'-bg';

/** Get page width info **/
$generic_content_full = ot_get_option('_uncode_' . $post_type . '_layout_width');
if ($generic_content_full === '') {
	$main_content_full = ot_get_option('_uncode_body_full');
	if ($main_content_full === '' || $main_content_full === 'off') {
		$limit_content_width = ' limit-width';
	}
} else {
	if ($generic_content_full === 'limit') {
		$generic_custom_width = ot_get_option('_uncode_' . $post_type . '_layout_width_custom');
		if (is_array($generic_custom_width) && !empty($generic_custom_width)) {
			$page_custom_width = ' style="max-width: ' . implode("", $generic_custom_width) . ';"';
		}
	}
}

/** Collect header data **/
$page_header_type = ot_get_option('_uncode_' . $post_type . '_header');
if ($page_header_type !== '' && $page_header_type !== 'none') {
	$metabox_data['_uncode_header_type'] = array(
		$page_header_type
	);
	$meta_data = uncode_get_general_header_data($metabox_data, $post_type, '');
	$metabox_data = $meta_data['meta'];
	$show_title = $meta_data['show_title'];
	$media = $meta_data['media'];
}

/** Get layout info **/
$activate_sidebar = ot_get_option('_uncode_' . $post_type . '_activate_sidebar');
$sidebar_name     = ot_get_option('_uncode_' . $post_type . '_sidebar');

if ($activate_sidebar !== 'off' && is_active_sidebar( $sidebar_name )) {
	$layout = ot_get_option('_uncode_' . $post_type . '_sidebar_position');
	if ($layout === '') {
		$layout = 'sidebar_right';
	}
	$sidebar = ot_get_option('_uncode_' . $post_type . '_sidebar');
	$sidebar_style = ot_get_option('_uncode_' . $post_type . '_sidebar_style');
	$sidebar_size = ot_get_option('_uncode_' . $post_type . '_sidebar_size');
	$sidebar_sticky = ot_get_option('_uncode_' . $post_type . '_sidebar_sticky');
	$sidebar_sticky = ($sidebar_sticky === 'on') ? ' sticky-element sticky-sidebar' : '';
	$sidebar_fill = ot_get_option('_uncode_' . $post_type . '_sidebar_fill');
	$sidebar_bg_color = ot_get_option('_uncode_' . $post_type . '_sidebar_bgcolor');
	$sidebar_bg_color = ($sidebar_bg_color !== '') ? ' style-' . $sidebar_bg_color . '-bg' : '';
	if ($sidebar_style === '') {
		$sidebar_style = $style;
	}
}

/**
 * DATA COLLECTION - END
 *
 */

$posts_counter = $wp_query->post_count;

/** Build header **/
if ($page_header_type !== '' && $page_header_type !== 'none') {
	$custom_title = ot_get_option('_uncode_'.$post_type.'_header_title_text');
	if ($custom_title === '') {
		$custom_title = esc_html__('Results for:','uncode') . ' ' . ucfirst(esc_html( get_search_query( false )));
	}
	$page_header = new unheader($metabox_data, $custom_title);

	$header_html = $page_header->html;
	if ($header_html !== '') {
		echo '<div id="page-header">';
		echo uncode_remove_p_tag( $page_header->html );
		echo '</div>';
	}
	
}
echo '<script type="text/javascript">UNCODE.initHeader();</script>';

if (have_posts()):

	$generic_body_content_block = ot_get_option('_uncode_' . $post_type . '_content_block');

	if ($generic_body_content_block === '') {

		/* Start the Loop */
		while (have_posts()):
			the_post();

			/* Include the Post-Format-specific template for the content.
			 * If you want to override this in a child theme, then include a file
			 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
			*/
			ob_start();
			get_template_part('content', 'search');
			$the_content .= ob_get_clean();
		endwhile;

	} else {
		$generic_body_content_block = apply_filters( 'wpml_object_id', $generic_body_content_block, 'post' );
		$uncode_block = get_post_field('post_content', $generic_body_content_block);
		if ( function_exists( 'relevanssi_init' ) ) {
		  $uncode_block = str_replace('[uncode_index','[uncode_index using_plugin="yes"', $uncode_block);
		} else {
			$archive_query = ' loop="size:'.get_option('posts_per_page').'|order_by:relevance|search:' . get_search_query() . '"';
			$regex = '/\[uncode_index(.*?)\]/';
			$regex_attr = '/(.*?)=\"(.*?)\"/';
			preg_match_all($regex, $uncode_block, $matches, PREG_SET_ORDER);
			foreach ($matches as $key => $value) {
				$index_found = false;
				$index_pagination = false;
				$index_infinite = false;
				if (isset($value[1])) {
					preg_match_all($regex_attr, trim($value[1]), $matches_attr, PREG_SET_ORDER);
					foreach ($matches_attr as $key_attr => $value_attr) {
						switch (trim($value_attr[1])) {
							case 'auto_query':
								if ($value_attr[2] === 'yes') {
									$index_found = true;
								}
								break;
							case 'pagination':
								if ($value_attr[2] === 'yes') {
									$index_pagination = true;
								}
								break;
							case 'infinite':
								if ($value_attr[2] === 'yes') {
									$index_infinite = true;
								}
								break;
						}
					}
				}
				if ($index_found) {
					preg_match('#\s(loop)="([^"]+)"#', $value[1], $loop_match);
					if (isset($loop_match[2])) {
						$loop_array = explode('|', $loop_match[2]);
						$rebuild_array = array();
						foreach($loop_array as $k=>$v){
							$loop_array[$k] = explode(':', $v);
							if ($loop_array[$k][0] === 'order_by') {
								$rebuild_array['order_by'] = $v;
							}
							if ($loop_array[$k][0] === 'order') {
								$rebuild_array['order'] = $v;
							}
							if ($loop_array[$k][0] === 'size') {
								$rebuild_array['size'] = $v;
							}
						}
						if (!isset($rebuild_array['order_by'])) {
							$rebuild_array['order_by'] = 'order_by:relevance';
						}
						if (!isset($rebuild_array['order'])) {
							$rebuild_array['order'] = 'order:ASC';
						}
						if (!isset($rebuild_array['size'])) {
							$rebuild_array['size'] = 'size:'.get_option('posts_per_page');
						}
						$rebuild_array['search'] = 'search:' . get_search_query();
						$archive_query = ' loop="'.implode('|', $rebuild_array).'"';
					}
					$value[1] = preg_replace('#\s(loop)="([^"]+)"#', $archive_query, $value[1], -1, $index_count);
					if ($index_count === 0) {
						$value[1] .= $archive_query;
					}
					$replacement = '[uncode_index' . $value[1] . ']';
					$uncode_block = str_replace($value[0], $replacement, $uncode_block);
					if ($index_pagination || $index_infinite) {
						$index_has_navigation = true;
					}
				}
			}
		}

		$the_content .= $uncode_block;
	}

	else :

		ob_start();
		get_template_part('content', 'none');
		$the_content .= ob_get_clean();

	endif;

	if ($layout === 'sidebar_right' || $layout === 'sidebar_left') {

		/** Build structure with sidebar **/

		if ($sidebar_size === '') {
			$sidebar_size = 4;
		}
		$main_size = 12 - $sidebar_size;
		$expand_col = '';

		/** Collect paddings data **/

		$footer_classes = ' no-top-padding double-bottom-padding';

		if ($sidebar_bg_color !== '') {
			if ($sidebar_fill === 'on') {
				$sidebar_inner_padding.= ' std-block-padding';
				$sidebar_padding.= $sidebar_bg_color;
				$expand_col = ' unexpand';
				if ($limit_content_width === '') {
					$row_classes.= ' no-h-padding col-no-gutter no-top-padding';
					$footer_classes = ' std-block-padding no-top-padding';
					$main_classes.= ' std-block-padding';
				} else {
					$row_classes.= ' no-top-padding';
					$main_classes.= ' double-top-padding';
				}
			} else {
				$row_classes .= ' double-top-padding';
	  			$row_classes .= ' double-bottom-padding';
				$sidebar_inner_padding.= $sidebar_bg_color . ' single-block-padding';
			}
		} else {
			$row_classes.= ' col-std-gutter double-top-padding';
			$main_classes.= ' double-bottom-padding';
		}

		$row_classes.= ' no-bottom-padding';
		$sidebar_inner_padding.= ' double-bottom-padding';

		/** Build sidebar **/

		$sidebar_content = "";
		ob_start();
		if ($sidebar !== '') {
			dynamic_sidebar($sidebar);
		} else {
			dynamic_sidebar(1);
		}
		$sidebar_content = ob_get_clean();

		/** Create html with sidebar **/

		$the_content = '<div class="post-content style-' . $style . $main_classes . '">' . $the_content . '</div>';

		$main_content = '<div class="col-lg-' . $main_size . '">
											' . $the_content . '
										</div>';

		$the_content = '<div class="row-container">
        							<div class="row row-parent un-sidebar-layout' . $row_classes . $limit_content_width . '"' . $page_custom_width . '>
												<div class="row-inner">
													' . (($layout === 'sidebar_right') ? $main_content : '') . '
													<div class="col-lg-' . $sidebar_size . '">
														<div class="uncol style-' . $sidebar_style . $expand_col . $sidebar_padding . (($sidebar_fill === 'on' && $sidebar_bg_color !== '') ? '' : $sidebar_sticky) . '">
															<div class="uncoltable' . (($sidebar_fill === 'on' && $sidebar_bg_color !== '') ? $sidebar_sticky : '') . '">
																<div class="uncell' . $sidebar_inner_padding . '">
																	<div class="uncont">
																		' . $sidebar_content . '
																	</div>
																</div>
															</div>
														</div>
													</div>
													' . (($layout === 'sidebar_left') ? $main_content : '') . '
												</div>
											</div>
										</div>';
	} else {
		
		$the_content = '<div class="row-inner">
			<div class="col-lg-2 tablet-hidden mobile-hidden"></div>
			<div class="col-lg-8 no-block-padding">
				' . $the_content . '
			</div>
			<div class="col-lg-2 tablet-hidden mobile-hidden"></div>
		</div>';

		/** Create html without sidebar **/
		if ($generic_body_content_block === '') {
			$the_content = '<div class="post-content un-no-sidebar-layout"' . $page_custom_width . '>' . uncode_get_row_template($the_content, false, ' full-width col-no-gutter', $style, '', false, false, false) . '</div>';
		} else {
			$the_content = '<div class="post-content un-no-sidebar-layout"' . $page_custom_width . '>' . $the_content . '</div>';
		}

	}

	/** Build and display navigation html **/
	$navigation_option = ot_get_option('_uncode_' . $post_type . '_navigation_activate');
	if ($navigation_option !== 'off') {
		$navigation = uncode_posts_navigation();
		if (!empty($navigation) && $navigation !== '') {
			$navigation_content = uncode_get_row_template($navigation, '', $limit_content_width, $style, ' row-navigation row-navigation-' . $style, true, true, true);
		}
	}

	/** Display post html **/
	echo 	'<div class="page-body' . $bg_color . '">
          <div class="post-wrapper">
          	<div class="post-body">' . do_shortcode($the_content) . '</div>' .
          	$navigation_content . '
          </div>
        </div>';

// end of the loop.

get_footer(); ?>
