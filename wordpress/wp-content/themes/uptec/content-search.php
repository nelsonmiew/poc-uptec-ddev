<?php

/**
 * @package uncode
 */

define('THEME_PATH', get_template_directory_uri());

global $wp_query;
$vars = $wp_query->query_vars;

$post_id = $post->ID;

$media_atributes = getAsyncData($post_id);						
$no_image = THEME_PATH.'/img/nopicture.png';
$image = get_the_post_thumbnail_url($post_id);

$image = $image ? $image : $no_image;

$title  = get_the_title($post_id);
$description = getPostDesc($post_id);
$permalink = get_the_permalink($post_id);

$width_img = 325;
$height_img = 220;

$fillSize = ($height_img/$width_img)*100;
$fillSize = str_replace(",", ".", $fillSize);

$style="margin:auto;";

$alt = get_post_meta( get_post_thumbnail_id( url_to_postid( $image ) ), '_wp_attachment_image_alt', true);

$type = str_replace("_", " ", get_post_type());

$output .= '<div class="search-divs">
	<figure>
		<picture class="slide_img has_bg has_mask " style="background-image:url('.$image.');" '.$media_atributes['data'].'>
			<a href="'.$permalink.'" class="aspectRatioPlaceholder" style="'.$style.'">
				<div class="fill" style="padding-bottom: '.$fillSize.'%"></div>
			</a>
		</picture>
		<figcaption>
			<div class="small-info">
				<span class="listing_text uppercase">'.$type.'</span>
			</div>
			<h3>'.$title.'</h3>
			<div class="description margin-top-xs"><p> '.$description.'</p></div>
			<a href="'.$permalink.'" class="button margin-top-xs">'.__('Check Details', 'uncode').'</a>
		</figcaption>
	</figure>
</div><div class="clearfix"></div>';

echo $output;
