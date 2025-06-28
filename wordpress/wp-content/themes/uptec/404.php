<?php
/**
 * The template for displaying 404 pages (Not Found).
 *
 * @package uncode
 */

get_header();

	/** Init variables **/
	$limit_width = $limit_content_width = $the_content = $main_content = $partial_content = $media_shortcode = $page_header_type = $page_class = '';
	$show_title = true;

	/** Get general datas **/
	// $style = ot_get_option('_uncode_general_style');
	// $bg_color = ot_get_option('_uncode_general_bg_color');
	$style = $bg_color ='dark';
	$bg_color = ($bg_color == '') ? ' style-'.$style.'-bg' : ' style-'.$bg_color.'-bg';

	/** Get page width info **/
	$generic_content_full = ot_get_option('_uncode_404_layout_width');

	if ($generic_content_full !== 'on') {
		$limit_width = ' limit-width';
	}

	/** Collect header data **/
	$page_header_type = ot_get_option('_uncode_404_header');
	if ($page_header_type !== 'none')  {
		$metabox_data['_uncode_header_type'] = array($page_header_type);
		$meta_data = uncode_get_general_header_data($metabox_data, '404', '');
		$metabox_data = $meta_data['meta'];
		$show_title = $meta_data['show_title'];

		$page_header_title = ot_get_option('_uncode_404_header_title');
		$page_header_title_text = ot_get_option('_uncode_404_header_title_text');
		if ($page_header_title === 'off') $page_header_title_text = '404';
		$metabox_data['_uncode_header_title'] = array('on');
		$metabox_data['_uncode_header_title_custom'] = array('on');
		$metabox_data['_uncode_header_text'] = array($page_header_title_text);

		$page_header = new unheader($metabox_data, '');

		$header_html = $page_header->html;
		if ($header_html !== '') {
			echo '<div id="page-header">';
			echo uncode_remove_p_tag( $page_header->html );
			echo '</div>';
		}
	}
	echo '<script type="text/javascript">UNCODE.initHeader();</script>';

	if(!$page_header_title_text) $page_header_title_text = "404";

	/** Collect body data **/
	$page_body_type = ot_get_option('_uncode_404_body');

	if ($page_body_type === '') {
		if ($page_header_type === 'none') $page_title = '<div class="heading-text el-text heading-bigtext"><h1 class="bigtext"><span>'.$page_header_title_text.'</span></h1></div>';
		else $page_title = '';
		$partial_content =
			'<div class="row-inner">
				<div class="pos-top pos-center align_left column_child col-lg-2 tablet-hidden mobile-hidden"></div>
				<div class="pos-middle pos-center align_center column_parent col-lg-8">
					<div class="uncol">
						<div class="uncoltable">
							<div class="uncell">
								<div class="uncont">
									<h1 class="extraBold">404</h1>
									<p class="extraBold">'.esc_html__("Incorrect adress or this page does not exist", "uncode").'</p>
									<a class="button" href="'.(get_home_url(get_current_blog_id(),'/')).'">' . esc_html__("Back", "uncode").'</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="pos-top pos-center align_left column_child col-lg-2 tablet-hidden mobile-hidden"></div>
			</div><!-- .row-inner -->';

		$the_content = uncode_get_row_template($partial_content, $limit_width, $limit_content_width, $style, '', true, true, 'double');
		$page_class = ' standard-404';

	} else {
		$uncodeblock_id = ot_get_option('_uncode_404_body_block');
		$uncodeblock_id = apply_filters( 'wpml_object_id', $uncodeblock_id, 'post' );
		$the_content = get_post_field('post_content', $uncodeblock_id);
	}

	/** Display post html **/
	echo '<div class="page-body' . $bg_color . $page_class . '">
          <div class="post-wrapper">
          	<div class="post-body">' . do_shortcode($the_content) . '</div>
          </div>
        </div>';

get_footer(); ?>