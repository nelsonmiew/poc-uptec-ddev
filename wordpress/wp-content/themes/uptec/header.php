<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div class="page-wrapper">
 *
 * @package uncode
 */

global $is_redirect, $redirect_page;

if ($redirect_page) {
	$post_id = $redirect_page;
} else {
	if (isset(get_queried_object()->ID) && !is_home()) {
		$post_id = get_queried_object()->ID;
	} else {
		$post_id = null;
	}
}

if (wp_is_mobile()) $html_class = 'touch';
else $html_class = 'no-touch';

if (is_admin_bar_showing()) $html_class .= ' admin-mode';

?><!DOCTYPE html>
<html class="<?php echo esc_attr($html_class); ?>" <?php language_attributes(); ?> xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=<?php bloginfo( 'charset' ); ?>">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
<?php wp_head(); ?>
</head>
<?php
	global $LOGO, $metabox_data, $onepage, $fontsizes, $is_redirect, $menutype;

	if ($post_id !== null) {
		$metabox_data = get_post_custom($post_id);
		$metabox_data['post_id'] = $post_id;
	} else $metabox_data = array();

	$onepage = false;
	$background_div = $background_style = $background_color_css = '';

	if (isset($metabox_data['_uncode_page_scroll'][0]) && $metabox_data['_uncode_page_scroll'][0] == 'on') {
		$onepage = true;
	}

	$boxed = ot_get_option( '_uncode_boxed');
	$vmenu_position = ot_get_option('_uncode_vmenu_position');
	$fontsizes = ot_get_option( '_uncode_heading_font_sizes');
	$background = ot_get_option( '_uncode_body_background');

	if (isset($metabox_data['_uncode_specific_body_background'])) {
		$specific_background = unserialize($metabox_data['_uncode_specific_body_background'][0]);
		if ($specific_background['background-color'] != '' || $specific_background['background-image'] != '') {
			$background = $specific_background;
		}
	}

	$back_class = '';
	if (!empty($background) && ($background['background-color'] != '' || $background['background-image'] != '')) {
		if ($background['background-color'] !== '') $background_color_css = ' style-'. $background['background-color'] . '-bg';
		$back_result_array = uncode_get_back_html($background, '', '', '', '', 'div');

		if ((strpos($back_result_array['mime'], 'image') !== false)) {
			$background_style .= (strpos($back_result_array['back_url'], 'background-image') !== false) ? $back_result_array['back_url'] : 'background-image: url(' . $back_result_array['back_url'] . ');';
			if ($background['background-repeat'] !== '') $background_style .= 'background-repeat: '. $background['background-repeat'] . ';';
			if ($background['background-position'] !== '') $background_style .= 'background-position: '. $background['background-position'] . ';';
			if ($background['background-size'] !== '') $background_style .= 'background-size: '. ($background['background-attachment'] === 'fixed' ? 'cover' : $background['background-size']) . ';';
			if ($background['background-attachment'] !== '') $background_style .= 'background-attachment: '. $background['background-attachment'] . ';';
		} else $background_div = $back_result_array['back_html'];
		if ($background_style !== '') $background_style = ' style="'.$background_style.'"';
		if (isset($back_result_array['async_class']) && $back_result_array['async_class'] !== '') {
			$back_class = $back_result_array['async_class'];
			$background_style .= $back_result_array['async_data'];
		}
	}

	$body_attr = '';
	if ($boxed === 'on') {
		$boxed_width = ' limit-width';
	} else {
		$boxed_width = '';
		$body_border = ot_get_option('_uncode_body_border');
		if ($body_border !== '' && $body_border !== 0) {
			$body_attr = ' data-border="' . esc_attr($body_border) . '"';
		}
	}

	if ( uncode_is_full_page(true) ) {
		if ( isset($metabox_data['_uncode_scroll_additional_padding'][0]) && $metabox_data['_uncode_scroll_additional_padding'][0] != '' )
			$fp_add_padding = $metabox_data['_uncode_scroll_additional_padding'][0];
		else
			$fp_add_padding = 0;

		$body_attr .= ' data-additional-padding="' . floatval($fp_add_padding) . '"';
	}


?>
<body <?php body_class($background_color_css); echo $body_attr; ?>>
	<?php echo uncode_remove_p_tag( $background_div ) ; ?>
	<?php do_action( 'before' );
	
	$body_border = ot_get_option('_uncode_body_border');
	if ($body_border !== '' && $body_border !== 0) {
		$general_style = ot_get_option('_uncode_general_style');
		$body_border_color = ot_get_option('_uncode_body_border_color');
		if ($body_border_color === '') $body_border_color = ' style-' . $general_style . '-bg';
		else $body_border_color = ' style-' . $body_border_color . '-bg';
		$body_border_frame ='<div class="body-borders" data-border="'.$body_border.'"><div class="top-border body-border-shadow"></div><div class="right-border body-border-shadow"></div><div class="bottom-border body-border-shadow"></div><div class="left-border body-border-shadow"></div><div class="top-border'.$body_border_color.'"></div><div class="right-border'.$body_border_color.'"></div><div class="bottom-border'.$body_border_color.'"></div><div class="left-border'.$body_border_color.'"></div></div>';
		//echo $body_border_frame;
	}
	
	$mostra_loader=1;
	if($_COOKIE['mostra_loader'] === "false"){
		$mostra_loader=0;
	}else{
		setcookie("mostra_loader", "false", time()+(3600*24*2), COOKIEPATH, COOKIE_DOMAIN);
		//$_SESSION['mostra_loader'] = "false";
	}
	
	?>
	<div class="loader">
		<?php if ( is_front_page() && $mostra_loader==1) { ?>
			<div class="loading">
				<?php echo file_get_contents(get_stylesheet_directory_uri().'/img/loader.svg'); ?>
				<svg id="loaderCircle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 388.3 388.3"><path d="M194.15,388.15c107.14,0,194-86.86,194-194s-86.86-194-194-194S.15,87,.15,194.15,87,388.15,194.15,388.15Z"/></svg>
			</div>
		<?php } ?>
	</div>

	<div class="menu_paths light">
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
	</div>
	<div class="menu_paths dark">
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
	</div>

	<div class="loaderTransition"></div>


	
	<div class="box-wrapper<?php echo esc_html($back_class); ?>"<?php echo wp_kses_post($background_style); ?>>
		<div class="box-container<?php echo esc_attr($boxed_width); ?>">
		<script type="text/javascript">UNCODE.initBox();</script>
		<?php
			if ($is_redirect !== true) {
				if ($menutype === 'vmenu-offcanvas' || $menutype === 'menu-overlay' || $menutype === 'menu-overlay-center') {
					$mainmenu = new unmenu('offcanvas_head', $menutype);
					echo uncode_remove_p_tag( $mainmenu->html );					
					?>
					<?php
				}
				if ( !($menutype === 'vmenu' && $vmenu_position === 'right') || (wp_is_mobile() && ($menutype === 'vmenu' && $vmenu_position === 'right') ) ) {
					$mainmenu = new unmenu($menutype, $menutype);
					echo uncode_remove_p_tag( $mainmenu->html );
				}
			}
			?>
			<nav id="menu" class="menu style-light">
				<div data-parent="true" class="vc_row row-container">
					<div class="row row-parent full-width col-no-gutter no-h-padding">
						<div class="row-inner mobile-flex">
							<div class="pos-middle pos-center column_parent col-lg-2 single-internal-gutter mobile-order-2" style="padding:0"></div>
							<div class="pos-middle pos-center column_parent col-lg-6 single-internal-gutter mobile-order-1" style="padding:0">
								<ul>
								<?php 
								$menu_name = 'primary';
								if (($locations = get_nav_menu_locations()) && isset($locations[$menu_name])){
									
									$menu = wp_get_nav_menu_object($locations[$menu_name]);
									$menu_items = wp_get_nav_menu_items($menu->term_id);
									
									$count = 0;
									$submenu = false;

									foreach ($menu_items as $key => $menu_item ) {
										$current = ( $menu_item->object_id == get_queried_object_id() ) ? ' current' : '';

										$title = $menu_item->title;
										$link = $menu_item->url;

										// item does not have a parent so menu_item_parent equals 0 (false)
										if ( !$menu_item->menu_item_parent ){
											// save this id for later comparison with sub-menu items
											$parent_id = $menu_item->ID;
											?>
											<li>
												<h2 class="menu-category">
													<?php echo $title; ?>
													<!-- <svg viewBox="0 0 408 408">
														<polygon fill="#000" fill-rule="nonzero" points="204 0 168.3 35.7 311.1 178.5 0 178.5 0 229.5 311.1 229.5 168.3 372.3 204 408 408 204"></polygon>
													</svg> -->
												</h2>
										<?php }
										
										if( $parent_id == $menu_item->menu_item_parent ){ // item does have a parent so menu_item_parent is greater than 0 (true) ?>
											<?php if ( !$submenu ){ ?>
												<?php $submenu = true; ?>
												<ul style="margin:0;">
											<?php } ?>
											<li class="listing_subtitle extraBold menu-page<?php echo $current; ?>"><a href="<?php echo $link; ?>"><?php echo $title; ?></a></li>
											<?php if ( $menu_items[ $count + 1 ]->menu_item_parent != $parent_id && $submenu ){ ?>
												</ul>
												<?php $submenu = false; ?>
											<?php } ?>
										<?php }  ?>

										<?php if ( $menu_items[ $count + 1 ]->menu_item_parent != $parent_id ){ ?>
											</li>                           
											<?php $submenu = false; ?>
										<?php } ?>

										<?php $count++; ?>												
									<?php } ?>											
								</ul>			
								<?php } ?>	
							</div>
							<div class="pos-middle pos-left column_parent col-lg-4 single-internal-gutter mobile-order-3" style="padding:0">
								<div class="menu-sideitem">
									<div class="tablet-hidden mobile-hidden">
											<?php echo do_shortcode(get_post_field('post_content', apply_filters( 'wpml_object_id', 8260))); ?>
									</div>
									<ul class="social-list">
									<?php
									$socials = ot_get_option( '_uncode_social_list');
									if (!empty($socials)) {
										foreach ($socials as $social) {
											echo '<li class="menu-item-link social-icon '.$social['_uncode_social_unique_id'].'"><a data-mouse-attractor="true" href="'.$social['_uncode_link'].'" target="_blank"><i class="'.$social['_uncode_social'].'"></i></a></li>';
										}
									}
									?>
									</ul>

									<a class="miew_area margin-top-md" href="http://miew.pt" target="_blank">
										<p>Made by</p><!--
										--><img src="<?php echo get_stylesheet_directory_uri(); ?>/img/miew.svg" alt="Miew" />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
			<script type="text/javascript">UNCODE.fixMenuHeight();</script>
			<div class="main-wrapper">
				<div class="main-container">
					<div class="page-wrapper<?php if ($onepage) echo ' main-onepage'; ?>">
						<div class="sections-container">
							<div class="page-main page-current">
								<div class="body_lines">
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
								</div>