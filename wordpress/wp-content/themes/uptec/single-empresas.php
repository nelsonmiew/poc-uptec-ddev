<?php
/**
 * The Template for displaying all single posts.
 *
 * @package uncode
 */

get_header();

/**
 * DATA COLLECTION - START
 *
 */

/** Init variables **/
$limit_width = $limit_content_width = $the_content = $main_content = $layout = $bg_color = $sidebar_style = $sidebar_bg_color = $sidebar = $sidebar_size = $sidebar_sticky = $sidebar_padding = $sidebar_inner_padding = $sidebar_content = $title_content = $media_content = $navigation_content = $page_custom_width = $row_classes = $main_classes = $footer_content = $footer_classes = $content_after_body = '';
$with_builder = false;
$post_type = $post->post_type;

/** Get general datas **/
if (isset($metabox_data['_uncode_specific_style'][0]) && $metabox_data['_uncode_specific_style'][0] !== '') {
	$style = $metabox_data['_uncode_specific_style'][0];
	if (isset($metabox_data['_uncode_specific_bg_color'][0]) && $metabox_data['_uncode_specific_bg_color'][0] !== '') {
		$bg_color = $metabox_data['_uncode_specific_bg_color'][0];
	}
} else {
	$style = ot_get_option('_uncode_general_style');
	if (isset($metabox_data['_uncode_specific_bg_color'][0]) && $metabox_data['_uncode_specific_bg_color'][0] !== '') {
		$bg_color = $metabox_data['_uncode_specific_bg_color'][0];
	} else $bg_color = ot_get_option('_uncode_general_bg_color');
}
$style = "light";
$bg_color = ($bg_color == '') ? ' style-'.$style.'-bg' : ' style-'.$bg_color.'-bg';


/** Get page width info **/
$boxed = ot_get_option('_uncode_boxed');

$page_content_full = (isset($metabox_data['_uncode_specific_layout_width'][0])) ? $metabox_data['_uncode_specific_layout_width'][0] : '';
if ($page_content_full === '') {

	/** Use generic page width **/
	$generic_content_full = ot_get_option('_uncode_' . $post_type . '_layout_width');
	if ($generic_content_full === '') {
		$main_content_full = ot_get_option('_uncode_body_full');
		if ($main_content_full === '' || $main_content_full === 'off') $limit_content_width = ' full-width';
	} else {
		if ($generic_content_full === 'limit') {
			$generic_custom_width = ot_get_option('_uncode_' . $post_type . '_layout_width_custom');
			if ($generic_custom_width[1] === 'px') {
				$generic_custom_width[0] = 12 * round(($generic_custom_width[0]) / 12);
			}
			if (is_array($generic_custom_width) && !empty($generic_custom_width)) {
				$page_custom_width = ' style="max-width: ' . implode("", $generic_custom_width) . '; margin: auto;"';
			}
		}
	}
} else {

	/** Override page width **/
	if ($page_content_full === 'limit') {
		$limit_content_width = ' full-width';
		$page_custom_width = (isset($metabox_data['_uncode_specific_layout_width_custom'][0])) ? unserialize($metabox_data['_uncode_specific_layout_width_custom'][0]) : '';
		if (is_array($page_custom_width) && !empty($page_custom_width) && $page_custom_width[0] !== '') {
			if ($page_custom_width[1] === 'px') {
				$page_custom_width[0] = 12 * round(($page_custom_width[0]) / 12);
			}
			$page_custom_width = ' style="max-width: ' . implode("", $page_custom_width) . '; margin: auto;"';
		} else $page_custom_width = '';
	}
}

$media = get_post_meta($post->ID, '_uncode_featured_media', 1);
$media_display = get_post_meta($post->ID, '_uncode_featured_media_display', 1);
$featured_image = get_post_thumbnail_id($post->ID);
if ($featured_image === '') $featured_image = $media;

/** Collect header data **/
if (isset($metabox_data['_uncode_header_type'][0]) && $metabox_data['_uncode_header_type'][0] !== '')
{
	$page_header_type = $metabox_data['_uncode_header_type'][0];
	if ($page_header_type !== 'none')
	{
		$meta_data = uncode_get_specific_header_data($metabox_data, $post_type, $featured_image);
		$metabox_data = $meta_data['meta'];
		$show_title = $meta_data['show_title'];
	}
}
else
{
	$page_header_type = ot_get_option('_uncode_' . $post_type . '_header');
	if ($page_header_type !== '' && $page_header_type !== 'none')
	{
		$metabox_data['_uncode_header_type'] = array($page_header_type);
		$meta_data = uncode_get_general_header_data($metabox_data, $post_type, $featured_image);
		$metabox_data = $meta_data['meta'];
		$show_title = $meta_data['show_title'];
	}
}

/** Get layout info **/
if (isset($metabox_data['_uncode_active_sidebar'][0]) && $metabox_data['_uncode_active_sidebar'][0] !== '')
{
	if ($metabox_data['_uncode_active_sidebar'][0] !== 'off')
	{
		$layout = (isset($metabox_data['_uncode_sidebar_position'][0])) ? $metabox_data['_uncode_sidebar_position'][0] : '';
		$sidebar = (isset($metabox_data['_uncode_sidebar'][0])) ? $metabox_data['_uncode_sidebar'][0] : '';
		$sidebar_size = (isset($metabox_data['_uncode_sidebar_size'][0])) ? $metabox_data['_uncode_sidebar_size'][0] : 4;
		$sidebar_sticky = (isset($metabox_data['_uncode_sidebar_sticky'][0]) && $metabox_data['_uncode_sidebar_sticky'][0] === 'on') ? ' sticky-element sticky-sidebar' : '';
		$sidebar_fill = (isset($metabox_data['_uncode_sidebar_fill'][0])) ? $metabox_data['_uncode_sidebar_fill'][0] : '';
		$sidebar_style = (isset($metabox_data['_uncode_sidebar_style'][0])) ? $metabox_data['_uncode_sidebar_style'][0] : $style;
		$sidebar_bg_color = (isset($metabox_data['_uncode_sidebar_bgcolor'][0]) && $metabox_data['_uncode_sidebar_bgcolor'][0] !== '') ? ' style-' . $metabox_data['_uncode_sidebar_bgcolor'][0] . '-bg' : '';
	}
}
else
{
	$activate_sidebar = ot_get_option('_uncode_' . $post_type . '_activate_sidebar');
	if ($activate_sidebar !== 'off')
	{
		$layout = ot_get_option('_uncode_' . $post_type . '_sidebar_position');
		if ($layout === '') $layout = 'sidebar_right';
		$sidebar = ot_get_option('_uncode_' . $post_type . '_sidebar');
		$sidebar_style = ot_get_option('_uncode_' . $post_type . '_sidebar_style');
		$sidebar_size = ot_get_option('_uncode_' . $post_type . '_sidebar_size');
		$sidebar_sticky = ot_get_option('_uncode_' . $post_type . '_sidebar_sticky');
		$sidebar_sticky = ($sidebar_sticky === 'on') ? ' sticky-element sticky-sidebar' : '';
		$sidebar_fill = ot_get_option('_uncode_' . $post_type . '_sidebar_fill');
		$sidebar_bg_color = ot_get_option('_uncode_' . $post_type . '_sidebar_bgcolor');
		$sidebar_bg_color = ($sidebar_bg_color !== '') ? ' style-' . $sidebar_bg_color . '-bg' : '';
	}
}
if ($sidebar_style === '') $sidebar_style = $style;

/** Get breadcrumb info **/
$generic_breadcrumb = ot_get_option('_uncode_' . $post_type . '_breadcrumb');
$page_breadcrumb = (isset($metabox_data['_uncode_specific_breadcrumb'][0])) ? $metabox_data['_uncode_specific_breadcrumb'][0] : '';
if ($page_breadcrumb === '')
{
	$breadcrumb_align = ot_get_option('_uncode_' . $post_type . '_breadcrumb_align');
	$show_breadcrumb = ($generic_breadcrumb === 'off') ? false : true;
}
else
{
	$breadcrumb_align = (isset($metabox_data['_uncode_specific_breadcrumb_align'][0])) ? $metabox_data['_uncode_specific_breadcrumb_align'][0] : '';
	$show_breadcrumb = ($page_breadcrumb === 'off') ? false : true;
}

/** Get title info **/
$generic_show_title = ot_get_option('_uncode_' . $post_type . '_title');
$page_show_title = (isset($metabox_data['_uncode_specific_title'][0])) ? $metabox_data['_uncode_specific_title'][0] : '';
if ($page_show_title === '')
{
	$show_title = ($generic_show_title === 'off') ? false : true;
}
else
{
	$show_title = ($page_show_title === 'off') ? false : true;
}

/** Get media info **/
$generic_show_media = ot_get_option('_uncode_' . $post_type . '_media');
$page_show_media = (isset($metabox_data['_uncode_specific_media'][0])) ? $metabox_data['_uncode_specific_media'][0] : '';
if ($page_show_media === '')
{
	$show_media = ($generic_show_media === 'off') ? false : true;
}
else
{
	$show_media = ($page_show_media === 'off') ? false : true;
}

if ( !$show_media && $featured_image !== '' ) {
	$generic_show_featured_media = ot_get_option('_uncode_' . $post_type . '_featured_media');
	$page_show_featured_media = (isset($metabox_data['_uncode_specific_featured_media'][0]) && $metabox_data['_uncode_specific_featured_media'][0] !== '') ? $metabox_data['_uncode_specific_featured_media'][0] : $generic_show_featured_media;

	if ( $page_show_featured_media === 'on' )
		$media = $featured_image;
} else {
	$page_show_featured_media = false;
}

$show_media = $page_show_featured_media && $page_show_featured_media!=='off' ? true : $show_media;

/**
 * DATA COLLECTION - END
 *
 */

while (have_posts()):
	the_post();

	/** Build header **/
	if ($page_header_type !== '' && $page_header_type !== 'none')
	{
		
		$page_header = new unheader($metabox_data, $post->post_title);

		$header_html = $page_header->html;
		if ($header_html !== '') {
			echo '<div id="page-header">';
			echo uncode_remove_p_tag( $page_header->html );
			echo '</div>';
		}

		if (!empty($page_header->poster_id) && $page_header->poster_id !== false && $media !== '')
		{
			$media = $page_header->poster_id;
		}
	}
	echo '<script type="text/javascript">UNCODE.initHeader();</script>';
	/** Build breadcrumb **/

	if ($show_breadcrumb && !is_front_page() && !is_home())
	{
		if ($breadcrumb_align === '') $breadcrumb_align = 'right';
		$breadcrumb_align = ' text-' . $breadcrumb_align;

		$content_breadcrumb = uncode_breadcrumbs();
		$breadcrumb_title = '<div class="breadcrumb-title h5 text-bold">' . get_the_title() . '</div>';
		echo uncode_get_row_template($breadcrumb_title . $content_breadcrumb , '', ($page_custom_width !== '' ? ' full-width' : $limit_content_width), $style, ' row-breadcrumb row-breadcrumb-' . $style . $breadcrumb_align, 'half', true, 'half');
	}

	/** Build media **/

	if ($media !== '' && !$with_builder && $show_media && !post_password_required())
	{
		if ($layout === 'sidebar_right' || $layout === 'sidebar_left')
		{
			$media_size = 12 - $sidebar_size;
		}
		else $media_size = 12;

		$media_array = explode(',', $media);
		$media_counter = count($media_array);
		$rand_id = big_rand();
		if ($media_counter === 0) $media_array = array(
			$media
		);

		if ($media_display === 'isotope') $media_content.=
			'<div id="gallery-' . $rand_id . '" class="isotope-system post-media">
				<div class="isotope-wrapper half-gutter">
	      	<div class="isotope-container isotope-layout style-masonry" data-type="masonry" data-layout="masonry" data-lg="1000" data-md="600" data-sm="480">';

		foreach ($media_array as $key => $value) {//check if albums are set among medias
			if ( get_post_mime_type($value) == 'oembed/gallery' && wp_get_post_parent_id($value) ) {
				$parent_id = wp_get_post_parent_id($value);
				$media_album_ids = get_post_meta($parent_id, '_uncode_featured_media', true);
				$media_arr = explode(',', $media);//eplode $media string to add album IDs
				$media_album_ids_arr = explode(',', $media_album_ids);
				if ( is_array($media_album_ids_arr) && !empty($media_album_ids_arr) ) {
					unset($media_array[$key]);//remove album featured image from array
					$media_album_ids_arr = array_reverse($media_album_ids_arr);
					foreach ($media_album_ids_arr as $_key => $_value) {
						array_splice($media_array, $key, 0, $_value);
						array_splice($media_arr, $key, 0, $_value);
					}
				}
				$media = implode(",", $media_arr);//implode $media again after adding album IDs
			}
		}

		foreach ($media_array as $key => $value)
		{
			if ($media_display === 'carousel') $value = $media;
			$block_data = array();
			$block_data['media_id'] = $value;
			$block_data['classes'] = array(
				'tmb'
			);
			$block_data['text_padding'] = 'no-block-padding';
			if ($media_display === 'isotope')
			{
				$block_data['single_width'] = 4;
				$block_data['classes'][] = 'tmb-iso-w4';
			}
			else $block_data['single_width'] = $media_size;
			$block_data['single_style'] = $style;
			$block_data['single_text'] = 'under';
			$block_data['classes'][] = 'tmb-' . $style;
			if ($media_display === 'isotope')
			{
				$block_data['classes'][] = 'tmb-overlay-anim';
				$block_data['classes'][] = 'tmb-overlay-text-anim';
				$block_data['single_icon'] = 'fa fa-plus2';
				$block_data['overlay_color'] = ($style == 'light') ? 'style-black-bg' : 'style-white-bg';
				$block_data['overlay_opacity'] = '20';
				$lightbox_classes = array();
				$lightbox_classes['data-noarr'] = false;
			}
			else
			{
				$lightbox_classes = false;
				$block_data['link_class'] = 'inactive-link';
				$block_data['link'] = '#';
			}
			$block_data['title_classes'] = array();
			$block_data['tmb_data'] = array();
			$block_layout['media'] = array();
			$block_layout['icon'] = array();
			$media_html = uncode_create_single_block($block_data, $rand_id, 'masonry', $block_layout, $lightbox_classes, false, true);
			if ($media_display !== 'isotope') $media_content.= '<div class="post-media">' . $media_html . '</div>';
			else
			{
				$media_content.= $media_html;
			}
			if ($media_display === 'carousel') break;
		}

		if ($media_display === 'isotope') $media_content.=
					'</div>
				</div>
			</div>';
	}

	/** Build title **/
	$title = $agencia = get_the_title();
	if ($show_title){
		$title_content .= apply_filters( 'uncode_before_body_title', '' );
		$title_content .= '<div class="post-title-wrapper"><h1 class="post-title">' . $title . '</h1>';
		$title_content .= '<div class="date-info">' . get_the_date('j M Y') . '</div>';
		$title_content .= '</div>';
		$title_content .= apply_filters( 'uncode_after_body_title', '' );
	}
	$query2 = get_post_meta($post->ID);

	/** Build content **/
	$the_content = get_the_content();

	$media_atributes = getAsyncData($post->ID);
	$image = get_the_post_thumbnail_url($post->ID);

	$center = $email = $contacto = $site = $alumni = "";
	if($query2['empresas_logotipo'][0]) $logo = $query2['empresas_logotipo'][0];   
	if($query2['empresas_center'][0]) $center = $query2['empresas_center'][0];
	if($query2['empresas_agencia'][0]) $agencia = $query2['empresas_agencia'][0]; 
	if($query2['empresas_alumni'][0]) $alumni = $query2['empresas_alumni'][0];   
	if($query2['empresas_email'][0]) $email = $query2['empresas_email'][0];
	if($query2['empresas_contacto'][0]) $contacto = $query2['empresas_contacto'][0];
	if($query2['empresas_link'][0]) $site = $query2['empresas_link'][0];
	
	$files = get_post_meta( $post->ID, 'icons_list', 1 );

	if($center){
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
	list($width, $height, $type, $attr) = getimagesize($logo);

	$width_img = 880;
	$height_img = 495;

	$fillSize = ($height_img/$width_img)*100;
	$fillSize = str_replace(",", ".", $fillSize);

	$smallInfo = "";
	$icons = "";
	
	if($alumni==="on"){
		$alumni = '<div class="margin-bottom-sm">
				<span class="texts alumni-info">'.__('Alumni', 'uncode').'</span>
		</div>';
	}
	if($site){
		$smallInfo .= '<div class="margin-bottom-sm">
			<h4><strong>'.__('Website', 'uncode').'</strong></h4>
			<a class="texts" href="'.$site.'" target="_blank">'.removeHTTP($site).'</a>
		</div>';
	}
	if($email){
		$smallInfo .= '<div class="margin-bottom-sm">
			<h4><strong>'.__('Email', 'uncode').'</strong></h4>
			<a class="texts" href="mailto:'.$email.'">'.$email.'</a>
		</div>';
	}
	if($contacto){
		$smallInfo .= '<div>
			<h4><strong>'.__('Phone', 'uncode').'</strong></h4>
			<a class="texts" href="tel:'.$contacto.'">'.$contacto.'</a>
		</div>';
	}
	if($files){
		$file_list = "";
		foreach ( $files as $attachment_id => $attachment_url ) {
			$file_list.='<div class="empresas-icons">
				<img src="'.$attachment_url.'" />
			</div>';
		}

		$smallInfo .= '<div class="empresas-icons-holder margin-top-md desktop-hidden">
			'.$file_list.'
		</div>';

		$icons = $file_list;
	}
	

	$parallax = json_encode(array(
		"axis" => "y",
		"fixedTil" => ".fixedParent",
	));

	if (has_shortcode($the_content, 'vc_row')) $with_builder = true;
	else{
		$the_content = '<div class="row-inner margin-top-md" style="padding:0;">
			<div class="pos-top pos-top align_left column_parent col-lg-2 single-internal-gutter tablet-hidden mobile-hidden"></div>
			<div class="pos-top pos-top align_left column_parent col-lg-5 single-internal-gutter double-top-padding fixedParent">
				<a class="button" href="https://uptec.up.pt/portfolio/" >'.__('Go back', 'uncode').'</a>	
				<div class="fixedContent  show-for-desktop" data-parallax='.$parallax.'>
					<div class="div_relative margin-top-md">
						<div class="glitch_label"> 
							<h1 class="title glitch_label_color text-stroked glitch_label_color-stroke">'.$title.'</h1>
							<span class="title glitch_label_main">'.$title.'</span>
							<span class="glitch_label_line glitch_label_line-first"></span>
							<span class="glitch_label_line glitch_label_line-second"></span>
						</div>
						<picture class="has_bg has_mask grayscale" alt="'.$title.'" title="'.$title.'" style="background-image:url('.$image.');" '.$media_atributes['data'].'>
							<div class="aspectRatioPlaceholder" style="margin:auto;">
								<div class="fill" style="padding-bottom: '.$fillSize.'%"></div>
							</div>
						</picture>
						<div class="desktop-hidden tablet-hidden mobile-hidden margin-top-sm">
							<h4><strong>'.__('Objetivos de Desenvolvimento Social', 'uncode').'</strong></h4>
							<p style="max-width:630px">'.__('We aim to deliver meaningful experiences through great design, awesome development and remarkable content. ', 'uncode').'</p>
							<div class="margin-top-sm">
								'.$icons.'
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="pos-top pos-top align_left column_parent col-lg-1 single-internal-gutter tablet-hidden mobile-hidden"></div>
			<div class="pos-top pos-top align_left column_parent col-lg-2 single-internal-gutter double-top-padding">
				<img class="grayscale margin-bottom-md" src="'.$logo.'" width="100%" alt="'.$title.'" title="'.$title.'" style="max-width:'.$width.'px" />
				'.$alumni.'
				<div class="margin-bottom-sm">
					<h4><strong>'.$agencia.'</strong></h4>
					<p>'.$centroTitle.'</p>
				</div>
				<div class="margin-bottom-sm">
                    <p>'.uncode_remove_p_tag(strip_tags($the_content)).'</p>
                </div>
                '.$smallInfo.'
			</div>
			<div class="pos-top pos-top align_left column_parent col-lg-2 single-internal-gutter tablet-hidden mobile-hidden"></div>
		</div>';
	}

	if (!$with_builder)
	{
		$the_content = apply_filters('the_content', $the_content);
		$the_content = $the_content;
		if ($media_content !== '') $the_content = $the_content . $media_content;
	} else {
		$get_content_appended = apply_filters('the_content', '');
		if (!is_null($get_content_appended) && $get_content_appended !== '') $the_content = $the_content . uncode_get_row_template($get_content_appended, $limit_width, $limit_content_width, $style, '', false, true, 'double', $page_custom_width);
	}

	$the_content .= wp_link_pages( array(
		'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'uncode' ),
		'after'  => '</div>',
		'link_before'	=> '<span>',
    'link_after'	=> '</span>',
		'echo'	=> 0
	));

	/** Build tags **/

	$page_show_tags = (isset($metabox_data['_uncode_specific_tags'][0])) ? $metabox_data['_uncode_specific_tags'][0] : '';
	if ($page_show_tags === '')
	{
		$generic_show_tags = ot_get_option('_uncode_' . $post_type . '_tags');
		$show_tags = ($generic_show_tags === 'off') ? false : true;
		if ($show_tags) $show_tags_align = ot_get_option('_uncode_' . $post_type . '_tags_align');
	}
	else
	{
		$show_tags = ($page_show_tags === 'off') ? false : true;
		if ($show_tags) $show_tags_align = (isset($metabox_data['_uncode_specific_tags_align'][0])) ? $metabox_data['_uncode_specific_tags_align'][0] : '';
	}

	$show_tags = false;

	if ($show_tags) {
		$tag_ids = wp_get_post_tags( $post->ID, array( 'fields' => 'ids' ) );
		if ( $tag_ids ) {
			$args = array(
				'smallest'                  => 11,
				'largest'                   => 11,
				'unit'                      => 'px',
				'include'                   => $tag_ids,
				'taxonomy'                  => 'post_tag',
				'echo'                      => false,
				'number'										=> 999,
			);

			$tag_cloud = '<div class="widget-container post-tag-container uncont text-'.$show_tags_align.'"><div class="tagcloud">' . wp_tag_cloud($args) . '</div></div>';

			if (!$with_builder) $the_content .= $tag_cloud;
			else {
				//$the_content .= uncode_get_row_template($tag_cloud, $limit_width, $limit_content_width, $style, '', false, true, 'double', $page_custom_width);
			}
	  }
	}

	/** JetPack related posts **/

	if ( shortcode_exists( 'jetpack-related-posts' ) ) {
		$related_content = do_shortcode('[jetpack-related-posts]');
		if ($related_content !== '') {
			if (!$with_builder) $the_content .= $related_content;
			else {
				$the_content .= uncode_get_row_template($related_content, $limit_width, $limit_content_width, $style, '', false, true, 'double', $page_custom_width);
			}
		}
	}

	/** Build post after block **/
	$content_after_body = '';
	$page_content_blocks_after = array(
		'above' => '_pre',
		'below' => ''
	);

	foreach ($page_content_blocks_after as $order => $pre) {

		$content_after_body_build = '';

		$page_content_block_after = (isset($metabox_data['_uncode_specific_content_block_after' . $pre][0])) ? $metabox_data['_uncode_specific_content_block_after' . $pre][0] : '';
		if ($page_content_block_after === '') {
			$generic_content_block_after = ot_get_option('_uncode_' . $post_type . '_content_block_after' . $pre);
			$content_block_after = $generic_content_block_after !== '' ? $generic_content_block_after : false;
		} else {
			$content_block_after = $page_content_block_after !== 'none' ? $page_content_block_after : false;
		}

		if ($content_block_after !== false) {
			$content_block_after = apply_filters( 'wpml_object_id', $content_block_after, 'post' );
			$content_after_body_build = get_post_field('post_content', $content_block_after);
			if (class_exists('Vc_Base')) {
				$vc = new Vc_Base();
				$vc->addShortcodesCustomCss($content_block_after);
			}
			if (has_shortcode($content_after_body_build, 'vc_row')) $content_after_body_build = '<div class="post-after row-container">' . $content_after_body_build . '</div>';
			else $content_after_body_build = '<div class="post-after row-container">' . uncode_get_row_template($content_after_body_build, $limit_width, $limit_content_width, $style, '', false, true, 'double', $page_custom_width) . '</div>';
			if (class_exists('RP4WP_Post_Link_Manager')) {
				if ( is_array(RP4WP::get()->settings) )
					$automatic_linking_post_amount = RP4WP::get()->settings[ 'general_' . $post_type ]->get_option( 'automatic_linking_post_amount' );
				else
				$automatic_linking_post_amount = RP4WP::get()->settings->get_option( 'automatic_linking_post_amount' );
				$uncode_related = new RP4WP_Post_Link_Manager();
				$related_posts = $uncode_related->get_children($post->ID,false);
				$related_posts_ids = array();
				foreach ($related_posts as $key => $value) {
					if (isset($value->ID)) $related_posts_ids[] = $value->ID;
				}
				$archive_query = '';
				$regex = '/\[uncode_index(.*?)\]/';
				$regex_attr = '/(.*?)=\"(.*?)\"/';
				preg_match_all($regex, $content_after_body_build, $matches, PREG_SET_ORDER);
				foreach ($matches as $key => $value) {
					$index_found = false;
					if (isset($value[1])) {
						preg_match_all($regex_attr, trim($value[1]), $matches_attr, PREG_SET_ORDER);
						foreach ($matches_attr as $key_attr => $value_attr) {
							switch (trim($value_attr[1])) {
								case 'auto_query':
									if ($value_attr[2] === 'yes') $index_found = true;
									break;
								case 'loop':
									$archive_query = $value_attr[2];
									break;
							}
						}
					}
					if ($index_found) {
						if ($archive_query === '') $archive_query = ' loop="size:10|by_id:' . implode(',', $related_posts_ids) .'|post_type:' . $post->post_type . '"';
						else {
							$parse_query = uncode_parse_loop_data($archive_query);
							$parse_query['by_id'] = implode(',', $related_posts_ids);
							if (!isset($parse_query['order'])) $parse_query['order'] = 'none';
							$archive_query = ' loop="' . uncode_unparse_loop_data($parse_query) . '"';
						}
						$value[1] = preg_replace('#\s(loop)="([^"]+)"#', $archive_query, $value[1], -1, $index_count);
						if ($index_count === 0) {
							$value[1] .= $archive_query;
						}
						$replacement = '[uncode_index' . $value[1] . ']';
						$content_after_body_build = str_replace($value[0], $replacement, $content_after_body_build);
					}
				}
			}
		}

		$content_after_body .= $content_after_body_build;

	}

	/** Build post footer **/

	$page_show_share = (isset($metabox_data['_uncode_specific_share'][0])) ? $metabox_data['_uncode_specific_share'][0] : '';
	if ($page_show_share === '') {
		$generic_show_share = ot_get_option('_uncode_' . $post_type . '_share');
		$show_share = ($generic_show_share === 'off') ? false : true;
	} else {
		$show_share = ($page_show_share === 'off') ? false : true;
	}

	if ($show_share)
		$share_content = '<div class="post-share">
			<div class="detail-container margin-auto">
				<h6 class="bold">'.__('Share Article', 'miew').'</h6>
				<div class="share-button share-buttons share-inline only-icon"></div>
			</div>
		</div>';

		//$footer_content.= $share_content;

	$show_comments = ot_get_option('_uncode_' . $post_type . '_comments');

	if ((comments_open() || '0' != get_comments_number()) && $show_comments === 'on')
	{
		ob_start();
		comments_template();
		$footer_content.= ob_get_clean();
	}

	if ($layout === 'sidebar_right' || $layout === 'sidebar_left')
	{

		/** Build structure with sidebar **/

		if ($sidebar_size === '') $sidebar_size = 4;
		$main_size = 12 - $sidebar_size;
		$expand_col = '';

		/** Collect paddings data **/

		$footer_classes = ' no-top-padding double-bottom-padding';

		if ($sidebar_bg_color !== '')
		{
			if ($sidebar_fill === 'on')
			{
				$sidebar_inner_padding.= ' std-block-padding';
				$sidebar_padding.= $sidebar_bg_color;
				$expand_col = ' unexpand';
				if ($limit_content_width === '')
				{
					$row_classes.= ' no-h-padding col-no-gutter no-top-padding';
					$footer_classes = ' std-block-padding no-top-padding';
					if (!$with_builder)
					{
						$main_classes.= ' std-block-padding';
					}
				}
				else
				{
					$row_classes.= ' no-top-padding';
					if (!$with_builder)
					{
						$main_classes.= ' double-top-padding';
					}
				}
			}
			else
			{
				$row_classes .= ' double-top-padding';
				$row_classes .= ' double-bottom-padding';
				$sidebar_inner_padding.= $sidebar_bg_color . ' single-block-padding';
			}
		}
		else
		{
			if ($with_builder)
			{
				if ($limit_content_width === '')
				{
					$row_classes.= ' col-std-gutter no-top-padding';
					if ($boxed !== 'on') $row_classes .= ' no-h-padding';
				}
				else $row_classes.= ' col-std-gutter no-top-padding';
				$sidebar_inner_padding.= ' double-top-padding';
			}
			else
			{
				$row_classes.= ' col-std-gutter double-top-padding';
				$main_classes.= ' double-bottom-padding';
			}
		}

		$row_classes.= ' no-bottom-padding';
		$sidebar_inner_padding.= ' double-bottom-padding';

		/** Build sidebar **/

		$sidebar_content = "";
		ob_start();
		if ($sidebar !== '')
		{
			dynamic_sidebar($sidebar);
		}
		else
		{
			dynamic_sidebar(1);
		}
		$sidebar_content = ob_get_clean();

		/** Create html with sidebar **/

		if ($footer_content !== '') {
			if ($limit_content_width === '') $footer_content = uncode_get_row_template($footer_content, $limit_width, $limit_content_width, $style, '', false, true, '');
			$footer_content = '<div class="post-footer post-footer-' . $style . ' style-' . $style . $footer_classes . '">' . $footer_content . '</div>';
		}

		$the_content = '<div class="post-content style-' . $style . $main_classes . '">' . $the_content . '</div>';

		$main_content = '<div class="col-lg-' . $main_size . '">
											' . $the_content . $content_after_body . $footer_content . '
										</div>';

		$the_content = '<div class="row-container">
        							<div class="row row-parent' . $row_classes . $limit_content_width . '"' . $page_custom_width . '>
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
	}
	else
	{

		$tag_ids = wp_get_post_tags( $post->ID, array( 'fields' => 'ids' ) );
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
		}
		
		

		$the_content = $the_content;
		/** Create html without sidebar **/
		if (!$with_builder) {
			$the_content = '<div data-parent="true" class="vc_row row-container onepage-section single-post-container">
			<div class="row row-parent style-light full-width col-no-gutter no-h-padding no-top-padding single-bottom-padding">
				'.$the_content.'
			</div>
		</div>';
		} else {
			$uncode_get_row_template = uncode_get_row_template($the_content, $limit_width, $limit_content_width, $style, '', 'double', false, 'double');
			if ( $uncode_get_row_template != '' )
				$the_content = '<div class="post-content"' . $page_custom_width . '>' . $uncode_get_row_template . '</div>';
		}
		$the_content .= $content_after_body;
		$uncode_get_row_template = uncode_get_row_template($footer_content, $limit_width, $limit_content_width, $style, '', false, true, 'double', $page_custom_width);
		if ( $uncode_get_row_template != '' )
			$the_content .= '<div class="post-footer post-footer-' . $style . ' row-container">' . $uncode_get_row_template . '</div>';
	}

	/** Build and display navigation html **/
	$navigation_option = ot_get_option('_uncode_' . $post_type . '_navigation_activate');
	if ($navigation_option !== 'off') {
		$generic_index = true;
		if (isset($metabox_data['_uncode_specific_navigation_index'][0]) && $metabox_data['_uncode_specific_navigation_index'][0] !== '') {
			$navigation_index = $metabox_data['_uncode_specific_navigation_index'][0];
			$generic_index = false;
		} else {
			$navigation_index = ot_get_option('_uncode_' . $post_type . '_navigation_index');
		}
		if ($navigation_index !== '')
		{
			$navigation_index_label = ot_get_option('_uncode_' . $post_type . '_navigation_index_label');
			$navigation_index_link = get_permalink($navigation_index);
			$navigation_index_btn = '<a class="btn btn-link text-default-color" href="' . esc_url($navigation_index_link) . '">' . ($navigation_index_label === '' ? get_the_title($navigation_index) : esc_html($navigation_index_label)) . '</a>';
		}
		else $navigation_index_btn = '';
		$navigation_nextprev_title = ot_get_option('_uncode_' . $post_type . '_navigation_nextprev_title');
		$navigation = uncode_post_navigation($navigation_index_btn, $navigation_nextprev_title, $navigation_index, $generic_index);
		if ($page_custom_width !== '') $limit_content_width = ' full-width';
		if (!empty($navigation) && $navigation !== '') $navigation_content = uncode_get_row_template($navigation, '', $limit_content_width, $style, ' row-navigation row-navigation-' . $style, true, true, true);
	}


	$categories = get_the_category();
	$cat_output = "";

	if($categories){
		foreach($categories as $category) {
			$cat_output .= $category->term_id.',';
		}

		$cat_output = substr($cat_output, 0, -1);
	}

	


	/** Display post html **/
	echo 	'<article id="post-'. get_the_ID().'" class="'.implode(' ', get_post_class('page-body' . $bg_color)) .'">
		  <div class="post-wrapper">
				<div class="post-body">' . $the_content . '</div>
				' . $navigation_content . '
          </div>
        </article>';

endwhile;
// end of the loop.

get_footer(); ?>

