<?php

/**
 * Theme Mode
 */
// add_filter('ot_theme_mode', '__return_true');

/**
 * Show Settings Pages
 */
add_filter('ot_show_pages', '__return_true');

/**
 * Show Theme Options UI Builder
 */
add_filter('ot_show_options_ui', '__return_false');

/**
 * Show Documentation
 */
add_filter('ot_show_docs', '__return_false');

/**
 * Meta Boxes
 */
add_filter('ot_meta_boxes', '__return_true');

function uncode_upload_text() {
    return esc_html__( 'Insert to options', 'uncode-core' );
}
add_filter('ot_upload_text', 'uncode_upload_text', 10, 2);

function uncode_header_logo_link()
{
	return '';
}

add_filter('ot_header_logo_link', 'uncode_header_logo_link', 10, 2);

function custom_theme_options_menu_slug() {
    return 'uncode-options';
}
add_filter('ot_theme_options_menu_slug', 'custom_theme_options_menu_slug', 10, 2);

function uncode_admin_slug() {
	return 'uncode-system-status';
}

add_filter('ot_theme_options_parent_slug', 'uncode_admin_slug');

function uncode_to_title() {
	return esc_html__('Theme Options','uncode-core');
}

add_filter('ot_theme_options_menu_title', 'uncode_to_title');
add_filter('ot_theme_options_page_title', 'uncode_to_title');

function custom_register_pages_array($array) {
	unset($array[0]);
  $array[1]['parent_slug'] = 'uncode-system-status';
  $array[1]['page_title'] = esc_html__('Options Import/Export','uncode-core');
  $array[1]['menu_title'] = esc_html__('Options Utils','uncode-core');
  return $array;
}
add_filter('ot_register_pages_array', 'custom_register_pages_array', 10, 2);

//ot_register_pages_array
function uncode_header_version_text()
{
	return esc_html__('Version','uncode-core') . ' ' . UNCODE_VERSION;
}

add_filter('ot_header_version_text', 'uncode_header_version_text', 10, 2);

function uncode_type_background_size_choices()
{
	return array(
		array(
			'label' => esc_html__('Background Size','uncode-core'),
			'value' => ''
		) ,
		array(
			'label' => 'cover',
			'value' => 'cover'
		) ,
		array(
			'label' => 'contain',
			'value' => 'contain'
		) ,
		array(
			'label' => 'initial',
			'value' => 'initial'
		)
	);
}

add_filter('ot_type_background_size_choices', 'uncode_type_background_size_choices', 10, 2);

if (!function_exists('ot_recognized_uncode_color'))
{

	function ot_recognized_uncode_color($field_id = '')
	{

		global $UNCODE_COLORS;

		return apply_filters('ot_recognized_uncode_color', $UNCODE_COLORS, $field_id);
	}
}

if (!function_exists('ot_recognized_uncode_colors_w_transp'))
{

	function ot_recognized_uncode_colors_w_transp($field_id = '')
	{

		global $UNCODE_COLORS;

		return apply_filters('ot_recognized_uncode_colors_w_transp', array_merge(array(
			array(
				'value' => 'transparent',
				'label' => esc_html__('Transparent', 'uncode-core')
			)
		) , $UNCODE_COLORS) , $field_id);
	}
}

function ot_type_background($args = array())
{

	/* turns arguments array into variables */
	extract($args);

	/* verify a description */
	$has_desc = $field_desc ? true : false;

	/* If an attachment ID is stored here fetch its URL and replace the value */
	if (isset($field_value['background-image']) && wp_attachment_is_image($field_value['background-image']))
	{

		$attachment_data = wp_get_attachment_image_src($field_value['background-image'], 'original');

		/* check for attachment data */
		if ($attachment_data)
		{

			$field_src = $attachment_data[0];
		}
	}

	/* format setting outer wrapper */
	echo '<div class="format-setting type-background ' . ($has_desc ? 'has-desc' : 'no-desc') . '">';

	/* description */
	//if ($has_desc) echo '<div class="description">' . htmlspecialchars_decode($field_desc) . '</div>';

	/* format setting inner wrapper */
	echo '<div class="format-setting-inner">';

	/* allow fields to be filtered */
	$ot_recognized_background_fields = apply_filters('ot_recognized_background_fields', array(
		'background-color',
		'background-repeat',
		'background-attachment',
		'background-position',
		'background-size',
		'background-image'
	) , $field_id);

	echo '<div class="ot-background-group">';

	/* build background color */
	if (in_array('background-color', $ot_recognized_background_fields))
	{

		$background_color = isset($field_value['background-color']) ? esc_attr($field_value['background-color']) : '';

		echo '<select name="' . esc_attr($field_name) . '[background-color]" id="' . esc_attr($field_id) . '-color" class="option-tree-ui-select uncode-color-select ' . esc_attr($field_class) . '">';

		$colors_array = ot_recognized_uncode_color($field_id);

		array_unshift($colors_array, array(
			'value' => '',
			'label' => esc_html__('Background Color', 'uncode-core')
		));
		foreach ($colors_array as $key => $value)
		{
			if (isset($value['disabled'])) echo '<option value="" disabled>' . esc_attr($value['label']) . '</option>';
			else
			{
				echo '<option class="' . esc_attr($value['value']) . '" value="' . esc_attr($value['value']) . '" ' . selected($background_color, $value['value'], false) . '>' . esc_attr($value['label']) . '</option>';
			}
		}

		echo '</select>';

	}

	/* build background repeat */
	if (in_array('background-repeat', $ot_recognized_background_fields))
	{

		$background_repeat = isset($field_value['background-repeat']) ? esc_attr($field_value['background-repeat']) : '';

		echo '<select name="' . esc_attr($field_name) . '[background-repeat]" id="' . esc_attr($field_id) . '-repeat" class="option-tree-ui-select ' . esc_attr($field_class) . '">';

		echo '<option value="">' . esc_html__('Background Repeat', 'uncode-core') . '</option>';
		foreach (ot_recognized_background_repeat($field_id) as $key => $value)
		{

			echo '<option value="' . esc_attr($key) . '" ' . selected($background_repeat, $key, false) . '>' . esc_attr($value) . '</option>';
		}

		echo '</select>';
	}

	/* build background attachment */
	if (in_array('background-attachment', $ot_recognized_background_fields))
	{

		$background_attachment = isset($field_value['background-attachment']) ? esc_attr($field_value['background-attachment']) : '';

		echo '<select name="' . esc_attr($field_name) . '[background-attachment]" id="' . esc_attr($field_id) . '-attachment" class="option-tree-ui-select ' . $field_class . '">';

		echo '<option value="">' . esc_html__('Background Attachment', 'uncode-core') . '</option>';

		foreach (ot_recognized_background_attachment($field_id) as $key => $value)
		{

			echo '<option value="' . esc_attr($key) . '" ' . selected($background_attachment, $key, false) . '>' . esc_attr($value) . '</option>';
		}

		echo '</select>';
	}

	/* build background position */
	if (in_array('background-position', $ot_recognized_background_fields))
	{

		$background_position = isset($field_value['background-position']) ? esc_attr($field_value['background-position']) : '';

		echo '<select name="' . esc_attr($field_name) . '[background-position]" id="' . esc_attr($field_id) . '-position" class="option-tree-ui-select ' . esc_attr($field_class) . '">';

		echo '<option value="">' . esc_html__('Background Position', 'uncode-core') . '</option>';

		foreach (ot_recognized_background_position($field_id) as $key => $value)
		{

			echo '<option value="' . esc_attr($key) . '" ' . selected($background_position, $key, false) . '>' . esc_attr($value) . '</option>';
		}

		echo '</select>';
	}

	/* Build background size  */
	if (in_array('background-size', $ot_recognized_background_fields))
	{

		$choices = apply_filters('ot_type_background_size_choices', '', $field_id);

		if (is_array($choices) && !empty($choices))
		{

			/* build select */
			echo '<select name="' . esc_attr($field_name) . '[background-size]" id="' . esc_attr($field_id) . '-size" class="option-tree-ui-select ' . esc_attr($field_class) . '">';

			foreach ((array)$choices as $choice)
			{
				if (isset($choice['value']) && isset($choice['label']))
				{
					echo '<option value="' . esc_attr($choice['value']) . '"' . selected((isset($field_value['background-size']) ? $field_value['background-size'] : '') , $choice['value'], false) . '>' . esc_attr($choice['label']) . '</option>';
				}
			}

			echo '</select>';
		}
		else
		{

			echo '<input type="text" name="' . esc_attr($field_name) . '[background-size]" id="' . esc_attr($field_id) . '-size" value="' . (isset($field_value['background-size']) ? esc_attr($field_value['background-size']) : '') . '" class="widefat ot-background-size-input option-tree-ui-input ' . esc_attr($field_class) . '" placeholder="' . esc_html__('background-size', 'uncode-core') . '" />';
		}
	}

	echo '</div>';

	/* build background image */
        if ( in_array( 'background-image', $ot_recognized_background_fields ) ) {

          echo '<div class="option-tree-ui-upload-parent">';

            /* input */
            echo '<input type="text" name="' . esc_attr( $field_name ) . '[background-image]" id="' . esc_attr( $field_id ) . '" value="' . ( isset( $field_value['background-image'] ) ? esc_attr( $field_value['background-image'] ) : '' ) . '" class="widefat option-tree-ui-upload-input ' . esc_attr( $field_class ) . '" />';

            /* add media button */
            echo '<a href="javascript:void(0);" class="ot_upload_media option-tree-ui-button button button-secondary light" rel="' . $post_id . '" title="' . esc_html__( 'Add Media', 'uncode-core' ) . '"><span class="icon fa fa-plus2"></span>' . esc_html__( 'Add Media', 'uncode-core' ) . '</a>';

          echo '</div>';

          /* media */
          if ( isset( $field_value['background-image'] ) && $field_value['background-image'] !== '' ) {

            echo '<div class="option-tree-ui-media-wrap" id="' . esc_attr( $field_id ) . '_media">';
            $post = get_post($field_value['background-image']);
            if (isset($post)) {
              if ($post->post_mime_type === 'oembed/svg') echo '<div class="option-tree-ui-image-wrap">' . $post->post_content . '</div>';
              else if ( preg_match( '/\.(?:jpe?g|png|gif|ico)$/i', $post->guid ) ||  $post->post_mime_type == 'image/url') echo '<div class="option-tree-ui-image-wrap"><img src="' . esc_url( $post->guid ) . '" alt="" /></div>';
              else echo '<div class="option-tree-ui-image-wrap"><div class="oembed"><span class="spinner" style="display: block; float: left;"></span></div><div class="oembed_code" style="display: none;">' . esc_url( $post->guid ) . '</div></div>';
            }

              echo '<a href="javascript:(void);" class="option-tree-ui-remove-media option-tree-ui-button button button-secondary light" title="' . esc_html__( 'Remove Media', 'uncode-core' ) . '"><span class="icon fa fa-minus2"></span>' . esc_html__( 'Remove Media', 'uncode-core' ) . '</a>';

            echo '</div>';

          }

        }

	echo '</div>';

	echo '</div>';
}

/**
 * Upload option type.
 *
 * See @ot_display_by_type to see the full list of available arguments.
 *
 * @param     array     An array of arguments.
 * @return    string
 *
 * @access    public
 * @since     2.0
 */
if ( ! function_exists( 'ot_type_upload' ) ) {

  function ot_type_upload( $args = array() ) {

    /* turns arguments array into variables */
    extract( $args );

    /* verify a description */
    $has_desc = $field_desc ? true : false;

	$has_correct_dimensions = true;

    /* If an attachment ID is stored here fetch its URL and replace the value */
    if ( $field_value && wp_attachment_is_image( $field_value ) ) {

		if ( function_exists( 'uncode_get_media_info' ) ) {
			$media_info = uncode_get_media_info($field_value);
			$media_metavalues = isset( $media_info->metadata ) ? unserialize($media_info->metadata ) : array();
			$field_src = $media_info->guid;

			if ( ! ( isset( $media_metavalues['width'] ) && $media_metavalues['width'] && isset( $media_metavalues['height'] ) && $media_metavalues['height'] ) ) {
				$has_correct_dimensions = false;
			}
		}

    }

    /* format setting outer wrapper */
    echo '<div class="format-setting type-upload ' . ( $has_desc ? 'has-desc' : 'no-desc' ) . ( isset( $field_src ) ? ' ot-upload-attachment-id-wrap' : '' ) . '">';

      /* description */
      //if ($has_desc) echo '<div class="description">' . htmlspecialchars_decode( $field_desc ) . '</div>';

      /* format setting inner wrapper */
      echo '<div class="format-setting-inner">';

        /* build upload */
        echo '<div class="option-tree-ui-upload-parent">';

          /* input */
          echo '<input type="text" name="' . esc_attr( $field_name ) . '" id="' . esc_attr( $field_id ) . '" value="' . esc_attr( $field_value ) . '" class="widefat option-tree-ui-upload-input ' . esc_attr( $field_class ) . '" readonly />';

          /* add media button */
          echo '<a href="javascript:void(0);" class="ot_upload_media option-tree-ui-button button button-secondary light" rel="' . $post_id . '" title="' . esc_html__( 'Add Media', 'uncode-core' ) . '"><span class="icon fa fa-plus2"></span>' . esc_html__( 'Add Media', 'uncode-core' ) . '</a>';

        echo '</div>';

        /* media */
        if ( $field_value ) {

          echo '<div class="option-tree-ui-media-wrap" id="' . esc_attr( $field_id ) . '_media">';

            /* replace image src */
            if ( isset( $field_src ) ) {
              $field_value = $field_src;
			}

            $post = get_post($field_value);

			if ( isset( $media_info ) && isset( $media_info->post_mime_type ) && $media_info->post_mime_type === 'image/svg+xml' ) {
				echo '<div class="option-tree-ui-image-wrap"><img src="' . esc_url( $field_value ) . '" alt="" /></div>';
			} else if ( ! $has_correct_dimensions ) {
				echo '<div class="option-tree-ui-image-wrap">' . sprintf( wp_kses_post( __( 'Please enter valid width and height measurements for your SVG. <a href="%s" target="_blank">Read More...</a>', 'uncode-core' ) ), 'https://support.undsgn.com/hc/en-us/articles/214001865#notes' ) . '</div>';
			} else if (isset($post->post_mime_type) && $post->post_mime_type === 'oembed/svg') {
				echo '<div class="option-tree-ui-image-wrap">' . $post->post_content . '</div>';
			} else if ( preg_match( '/\.(?:jpe?g|png|gif|ico)$/i', $field_value ) ) {
              echo '<div class="option-tree-ui-image-wrap"><img src="' . esc_url( $field_value ) . '" alt="" /></div>';
			} else {
				echo '<div class="option-tree-ui-image-wrap"><div class="option-tree-ui-image-wrap"><div class="oembed" onload="alert(\'load\');"><span class="spinner" style="display: block; float: left;"></span></div><div class="oembed_code" style="display: none;">' . esc_url( $field_value ) . '</div></div></div>';
			}

            echo '<a href="javascript:(void);" class="option-tree-ui-remove-media option-tree-ui-button button button-secondary light" title="' . esc_html__( 'Remove Media', 'uncode-core' ) . '"><span class="icon fa fa-minus2"></span>' . esc_html__( 'Remove Media', 'uncode-core' ) . '</a>';

          echo '</div>';

        }

      echo '</div>';

    echo '</div>';

  }

}

/**
 * Helper function to display list items.
 *
 * This function is used in AJAX to add a new list items
 * and when they have already been added and saved.
 *
 * @param     string    $name The form field name.
 * @param     int       $key The array key for the current element.
 * @param     array     An array of values for the current list item.
 *
 * @return   void
 *
 * @access   public
 * @since    2.0
 */
if ( ! function_exists( 'ot_list_item_view' ) ) {

  function ot_list_item_view( $name, $key, $list_item = array(), $post_id = 0, $get_option = '', $settings = array(), $type = '' ) {

    	/* required title setting */
    $required_setting = array(
		array(
			'id'        => 'title',
			'label'     => esc_html__( 'Title', 'uncode-core' ),
			'desc'      => '',
			'std'       => '',
			'type'      => 'text',
			'rows'      => '',
			'class'     => 'option-tree-setting-title',
			'post_type' => '',
			'choices'   => array()
		)
	);


    /* load the old filterable slider settings */
    if ( 'slider' == $type ) {

      $settings = ot_slider_settings( $name );

    }

    /* if no settings array load the filterable list item settings */
    if ( empty( $settings ) ) {

      $settings = ot_list_item_settings( $name );

    }

    /* merge the two settings array */
    $settings = array_merge( $required_setting, $settings );

    echo '
    <div class="option-tree-setting">
      <div class="open">' . ( isset( $list_item['title'] ) ? esc_attr( $list_item['title'] ) : '' ) . '</div>
      <div class="button-section">
        <a href="javascript:void(0);" class="option-tree-setting-edit option-tree-ui-button button" title="' . esc_html__( 'Edit', 'uncode-core' ) . '">
          <span class="icon ot-icon-pencil"></span>' . esc_html__( 'Edit', 'uncode-core' ) . '
        </a>
        <a href="javascript:void(0);" class="option-tree-setting-remove option-tree-ui-button button button-secondary light" title="' . esc_html__( 'Delete', 'uncode-core' ) . '">
          <span class="icon ot-icon-trash-o"></span>' . esc_html__( 'Delete', 'uncode-core' ) . '
        </a>
      </div>
      <div class="option-tree-setting-body">';

      foreach( $settings as $field ) {

        // Set field value
        $field_value = isset( $list_item[$field['id']] ) ? $list_item[$field['id']] : '';

        /* set default to standard value */
        if ( isset( $field['std'] ) ) {
          $_u_id = (function_exists('uncode_big_rand')) ? uncode_big_rand() : rand();
          $field_value = ot_filter_std_value( $field_value, ((isset($field['class']) && $field['class'] === 'unique_id') ? $field['std'] . $_u_id : $field['std']) );
        }

        // filter the title label and description
        if ( $field['id'] == 'title' ) {

          // filter the label
          $field['label'] = apply_filters( 'ot_list_item_title_label', $field['label'], $name );

          // filter the description
          $field['desc'] = apply_filters( 'ot_list_item_title_desc', $field['desc'], $name );

        }

        /* make life easier */
        $_field_name = $get_option ? $get_option . '[' . $name . ']' : $name;

        /* build the arguments array */
        $_args = array(
			'type'                => $field['type'],
			'field_id'            => $name . '_' . $field['id'] . '_' . $key,
			'field_name'          => $_field_name . '[' . $key . '][' . $field['id'] . ']',
			'field_value'         => $field_value,
			'field_desc'          => isset( $field['desc'] ) ? $field['desc'] : '',
			'field_std'           => isset( $field['std'] ) ? $field['std'] : '',
			'field_rows'          => isset( $field['rows'] ) ? $field['rows'] : 10,
			'field_post_type'     => isset( $field['post_type'] ) && ! empty( $field['post_type'] ) ? $field['post_type'] : 'post',
			'field_taxonomy'      => isset( $field['taxonomy'] ) && ! empty( $field['taxonomy'] ) ? $field['taxonomy'] : 'category',
			'field_min_max_step'  => isset( $field['min_max_step'] ) && ! empty( $field['min_max_step'] ) ? $field['min_max_step'] : '0,100,1',
			'field_class'         => isset( $field['class'] ) ? $field['class'] : '',
			'field_condition'     => isset( $field['condition'] ) ? $field['condition'] : '',
			'field_operator'      => isset( $field['operator'] ) ? $field['operator'] : 'and',
			'field_choices'       => isset( $field['choices'] ) && ! empty( $field['choices'] ) ? $field['choices'] : array(),
			'field_settings'      => isset( $field['settings'] ) && ! empty( $field['settings'] ) ? $field['settings'] : array(),
			'field_extra_choices' => isset( $field['extra_choices'] ) ? $field['extra_choices'] : array(),
			'post_id'             => $post_id,
			'get_option'          => $get_option
        );

        $conditions = '';

        /* setup the conditions */
        if ( isset( $field['condition'] ) && ! empty( $field['condition'] ) ) {

          /* doing magic on the conditions so they work in a list item */
          $conditionals = explode( ',', $field['condition'] );
          foreach( $conditionals as $condition ) {
            $parts = explode( ':', $condition );
            if ( isset( $parts[0] ) ) {
              $field['condition'] = str_replace( $condition, $name . '_' . $parts[0] . '_' . $key . ':' . $parts[1], $field['condition'] );
            }
          }

          $conditions = ' data-condition="' . $field['condition'] . '"';
          $conditions.= isset( $field['operator'] ) && in_array( $field['operator'], array( 'and', 'AND', 'or', 'OR' ) ) ? ' data-operator="' . $field['operator'] . '"' : '';

        }

        // Build the setting CSS class
        if ( ! empty( $_args['field_class'] ) ) {

          $classes = explode( ' ', $_args['field_class'] );

          foreach( $classes as $_key => $value ) {

            $classes[$_key] = $value . '-wrap';

          }

          $class = 'format-settings ' . implode( ' ', $classes );

        } else {

          $class = 'format-settings';

        }

        /* option label */
        echo '<div id="setting_' . $_args['field_id'] . '" class="' . $class . '"' . $conditions . '>';

          /* don't show title with textblocks */
          if ( $_args['type'] != 'textblock' && ! empty( $field['label'] ) ) {
            echo '<div class="format-setting-label">';
              echo '<h3 class="label">' . esc_attr( $field['label'] ) . '</h3>';
            echo '</div>';
          }

          /* only allow simple textarea inside a list-item due to known DOM issues with wp_editor() */
          if ( apply_filters( 'ot_override_forced_textarea_simple', false, $field['id'] ) == false && $_args['type'] == 'textarea' )
            $_args['type'] = 'textarea-simple';

          /* option body, list-item is not allowed inside another list-item */
          if ( $_args['type'] !== 'list-item' && $_args['type'] !== 'slider' ) {
            echo ot_display_by_type( $_args );
          }

        echo '</div>';

      }

      echo '</div>';

    echo '</div>';

  }

}

/**
 * Uncode color select option type.
 *
 * See @ot_display_by_type to see the full list of available arguments.
 *
 * @param     array     An array of arguments.
 * @return    string
 *
 * @access    public
 * @since     2.0
 */
if (!function_exists('ot_type_uncode_color'))
{

	function ot_type_uncode_color($args = array())
	{

		/* turns arguments array into variables */
		extract($args);

		/* verify a description */
		$has_desc = $field_desc ? true : false;

		/* format setting outer wrapper */
		echo '<div class="format-setting type-select ' . ($has_desc ? 'has-desc' : 'no-desc') . '" style="overflow: visible;">';

		/* description */
		//if ($has_desc) echo '<div class="description">' . htmlspecialchars_decode($field_desc) . '</div>';

		/* filter choices array */
		$field_choices = apply_filters('ot_recognized_uncode_color', $field_choices, $field_id);

		$colors_array = ot_recognized_uncode_color($field_id);
		array_unshift($colors_array, array(
			'value' => '',
			'label' => 'Select…'
		));

		/* format setting inner wrapper */
		echo '<div class="format-setting-inner">';

		/* build select */
		echo '<select name="' . esc_attr($field_name) . '" id="' . esc_attr($field_id) . '" class="option-tree-ui-select uncode-color-select ' . esc_attr($field_class) . '">';
		foreach ($colors_array as $key => $value)
		{
			if (isset($value['disabled'])) echo '<option value="" disabled>' . esc_attr($value['label']) . '</option>';
			else
			{
				echo '<option class="' . esc_attr($value['value']) . '" value="' . esc_attr($value['value']) . '" ' . selected($field_value, $value['value'], false) . '>' . esc_attr($value['label']) . '</option>';
			}
		}

		echo '</select>';

		echo '</div>';

		echo '</div>';
	}
}

/**
 * Uncode color with transparense select option type.
 *
 * See @ot_display_by_type to see the full list of available arguments.
 *
 * @param     array     An array of arguments.
 * @return    string
 *
 * @access    public
 * @since     2.0
 */
if (!function_exists('ot_type_uncode_colors_w_transp'))
{

	function ot_type_uncode_colors_w_transp($args = array())
	{

		/* turns arguments array into variables */
		extract($args);

		/* verify a description */
		$has_desc = $field_desc ? true : false;

		/* format setting outer wrapper */
		echo '<div class="format-setting type-select ' . ($has_desc ? 'has-desc' : 'no-desc') . '" style="overflow: visible;">';

		/* description */
		//if ($has_desc) echo '<div class="description">' . htmlspecialchars_decode($field_desc) . '</div>';

		/* filter choices array */
		$field_choices = apply_filters('ot_recognized_uncode_colors_w_transp', $field_choices, $field_id);

		$colors_array = ot_recognized_uncode_colors_w_transp($field_id);
		array_unshift($colors_array, array(
			'value' => '',
			'label' => 'Select…'
		));

		/* format setting inner wrapper */
		echo '<div class="format-setting-inner">';

		/* build select */
		echo '<select name="' . esc_attr($field_name) . '" id="' . esc_attr($field_id) . '" class="option-tree-ui-select uncode-color-select ' . esc_attr($field_class) . '">';
		foreach ($colors_array as $key => $value)
		{
			if (isset($value['disabled'])) echo '<option value="" disabled>' . esc_attr($value['label']) . '</option>';
			else
			{
				echo '<option class="' . esc_attr($value['value']) . '" value="' . esc_attr($value['value']) . '" ' . selected($field_value, $value['value'], false) . '>' . esc_attr($value['label']) . '</option>';
			}
		}

		echo '</select>';

		echo '</div>';

		echo '</div>';
	}
}

function uncode_is_not_null($val){
	return !empty($val);
}

function uncode_css_upload_error_notice() {
    ?>
    <div class="error">
        <p><?php esc_html_e( 'Failed to save the dynamics css files!', 'uncode-core' ); ?></p>
    </div>
    <?php
}

if (!function_exists('uncode_create_dynamic_css')) {
	function uncode_create_dynamic_css( $inline = false ) {

		$css_dir = get_template_directory() . '/library/css/';
		ob_start(); // Capture all output (output buffering)

		require(get_template_directory() . '/core/inc/style-custom.css.php'); // Generate CSS

		if ( apply_filters( 'uncode_use_style_custom_ver', false ) ) {
			update_option( 'uncode_style_custom_last_update', strtotime("now"), false );
		}

		$css = ob_get_clean(); // Get generated CSS (output buffering)

		if ($css === 'exit') return;

		if ( uncode_append_custom_styles_to_head() || $inline === true ) {
			return array(
				'custom' => $css,
				'admin' => $admin_css,
			);
		}

		global $wp_filesystem;
		if (empty($wp_filesystem)) {
			require_once (ABSPATH . '/wp-admin/includes/file.php');
		}
		if (false === ($creds = request_filesystem_credentials($css_dir, '', false, false))) {
			return array(
				'custom' => $css,
				'admin' => $admin_css,
			);
		}
		/* initialize the API */
		if ( ! WP_Filesystem($creds) ) {
			/* any problems and we exit */
			return array(
				'custom' => $css,
				'admin' => $admin_css,
			);
		}
		$ot_id = is_multisite() ? get_current_blog_id() : '';
		/* do our file manipulations below */
		$mod_file = (defined('FS_CHMOD_FILE')) ? FS_CHMOD_FILE : false;
		if (!$wp_filesystem->put_contents( $css_dir . 'style-custom'.$ot_id.'.css', $css, $mod_file ) || !$wp_filesystem->put_contents( get_template_directory() . '/core/assets/css/admin-custom'.$ot_id.'.css', $admin_css, $mod_file ))
			return array(
				'custom' => $css,
				'admin' => $admin_css,
			);
	}
}
add_action('ot_after_theme_options_save', 'uncode_create_dynamic_css');

add_action('wp_ajax_css_compile_ajax', 'uncode_create_dynamic_css_ajax');
if (!function_exists('uncode_create_dynamic_css_ajax')):
/**
 * @since Uncode 1.5.0
 */
function uncode_create_dynamic_css_ajax() {

	uncode_create_dynamic_css();

	die();
}
endif;//uncode_create_dynamic_css_ajax

function uncode_init_color() {
	if (is_admin() && isset($_GET['first'] )) {
		uncode_create_dynamic_css();
	}
}

add_action('admin_init', 'uncode_init_color');

if ( ! function_exists( 'uncode_darken_color' ) ) :
/**
 * @since Uncode 1.6.0
 */
function uncode_darken_color($hex, $steps=-12.75) {
	if ( $hex === 'transparent' ) {
		return $hex;
	}

	if ( strpos($hex, 'rgba') !== false ) {
		return $hex;
	}

    $steps = max(-255, min(255, $steps));

    $hex = str_replace('#', '', $hex);
    if (strlen($hex) == 3) {
        $hex = str_repeat(substr($hex,0,1), 2).str_repeat(substr($hex,1,1), 2).str_repeat(substr($hex,2,1), 2);
    }

	if( preg_match("/^[0-9A-F]{6}$/i", $hex) ) {
		$color_parts = str_split($hex, 2);
		$return = '#';

		foreach ($color_parts as $color) {
			$color   = hexdec($color);
			$color   = max(0,min(255,$color + $steps));
			$return .= str_pad(dechex(intval($color)), 2, '0', STR_PAD_LEFT);
		}
	}

    return $return;
}
endif;//uncode_darken_color

if ( ! function_exists( 'uncode_get_colors_via_ajax' ) ) :
/**
 * @since Uncode 1.7.0
 */
function uncode_get_colors_via_ajax() {
	$colors_array = ot_recognized_uncode_color();

	wp_send_json( $colors_array );
}
endif;
add_action( 'wp_ajax_uncode_get_colors', 'uncode_get_colors_via_ajax' );

if ( ! function_exists( 'uncode_get_font_family_via_ajax' ) ) :
/**
 * @since Uncode 1.7.0
 */
function uncode_get_font_family_via_ajax() {
	$custom_fonts = array(
		array(
			'value' => '',
			'label' => esc_html__('Default', "uncode-core"),
		)
	);

	$custom_fonts_array = ot_get_option('_uncode_font_groups');
	if (!empty($custom_fonts_array)) {
		foreach ($custom_fonts_array as $key => $value) {
			$custom_fonts[] = array(
				'value' => $value['_uncode_font_group_unique_id'],
				'label' => $value['title'],
			);
		}
	}

	wp_send_json( $custom_fonts );
}
endif;
add_action( 'wp_ajax_uncode_get_font_family', 'uncode_get_font_family_via_ajax' );

if ( ! function_exists( 'uncode_get_font_size_via_ajax' ) ) :
/**
 * @since Uncode 1.7.0
 */
function uncode_get_font_size_via_ajax() {
	$title_size = array(
		array(
			'value' => 'h1',
			'label' => esc_html__('h1', 'uncode-core')
		),
		array(
			'value' => 'h2',
			'label' => esc_html__('h2', 'uncode-core'),
		),
		array(
			'value' => 'h3',
			'label' => esc_html__('h3', 'uncode-core'),
		),
		array(
			'value' => 'h4',
			'label' => esc_html__('h4', 'uncode-core'),
		),
		array(
			'value' => 'h5',
			'label' => esc_html__('h5', 'uncode-core'),
		),
		array(
			'value' => 'h6',
			'label' => esc_html__('h6', 'uncode-core'),
		),
	);

	$font_sizes = ot_get_option('_uncode_heading_font_sizes');
	if (!empty($font_sizes)) {
		foreach ($font_sizes as $key => $value) {
			$title_size[] = array(
				'value' => $value['_uncode_heading_font_size_unique_id'],
				'label' => $value['title'],
			);
		}
	}

	$title_size[] = array(
		'value' => 'bigtext',
		'label' => esc_html__('BigText', 'uncode-core'),
	);

	wp_send_json( $title_size );
}
endif;
add_action( 'wp_ajax_uncode_get_font_size', 'uncode_get_font_size_via_ajax' );

if ( ! function_exists( 'uncode_get_line_height_via_ajax' ) ) :
/**
 * @since Uncode 1.7.0
 */
function uncode_get_line_height_via_ajax() {
	$title_height = array(
		array(
			'value' => '',
			'label' => esc_html__('Default', "uncode-core")
		),
	);

	$font_heights = ot_get_option('_uncode_heading_font_heights');
	if (!empty($font_heights)) {
		foreach ($font_heights as $key => $value) {
			$title_height[] = array(
				'value' => $value['_uncode_heading_font_height_unique_id'],
				'label' => $value['title'],
			);
		}
	}

	wp_send_json( $title_height );
}
endif;
add_action( 'wp_ajax_uncode_get_line_height', 'uncode_get_line_height_via_ajax' );

if ( ! function_exists( 'uncode_get_letter_spacing_via_ajax' ) ) :
/**
 * @since Uncode 1.7.0
 */
function uncode_get_letter_spacing_via_ajax() {
	$title_spacing = array(
		array(
			'value' => '',
			'label' => esc_html__('Default', "uncode-core")
		),
	);

	$font_spacings = ot_get_option('_uncode_heading_font_spacings');
	if (!empty($font_spacings)) {
		foreach ($font_spacings as $key => $value) {
			$title_spacing[] = array(
				'value' => $value['_uncode_heading_font_spacing_unique_id'],
				'label' => $value['title'],
			);
		}
	}

	wp_send_json( $title_spacing );
}
endif;
add_action( 'wp_ajax_uncode_get_letter_spacing', 'uncode_get_letter_spacing_via_ajax' );

if ( ! function_exists( 'uncode_process_toggle_ajax_theme_panel' ) ) :
/**
 * @since Uncode 1.7.0
 */
function uncode_process_toggle_ajax_theme_panel() {
	if ( isset( $_POST[ 'toggle_ajax' ] ) && isset( $_POST[ 'uncode_toggle_ajax_theme_panel_nonce' ] ) && wp_verify_nonce( $_POST[ 'uncode_toggle_ajax_theme_panel_nonce' ], 'uncode_toggle_ajax_theme_panel' ) ) {
		$action = $_POST[ 'toggle_ajax' ];

		if ( $action == 'enable-ajax' ) {
			update_option( 'uncode_ajax_theme_panel', 'yes', false );
		} else {
			update_option( 'uncode_ajax_theme_panel', 'no', false );
		}
	}
}
endif;
add_action( 'wp_loaded', 'uncode_process_toggle_ajax_theme_panel' );

if ( ! function_exists( 'uncode_core_option_tree_admin_js' ) ) :
/**
 * Option Tree scripts
 */
function uncode_core_option_tree_admin_js() {
	if ( ! defined( 'UNCODE_SLIM' ) ) {
		return;
	}

	$theme   = wp_get_theme();
	$version = $theme->get( 'Version' );

	wp_enqueue_script('uncode-ot-admin', OT_URL . 'assets/js/min/ot-admin-extended.min.js', array('ot-admin-js'), $version, false);
}
endif;
add_action('ot_admin_scripts_after', 'uncode_core_option_tree_admin_js');

/**
 * Create dynamic CSS when upgrading or installing Uncode Core
 */
add_action( 'uncode_core_upgraded', 'uncode_create_dynamic_css' );

/**
 * Append custom CSS inline or not
 */
if ( ! function_exists( 'uncode_core_append_custom_styles_to_head' ) ) {
	function uncode_core_append_custom_styles_to_head() {
		$append_inline = apply_filters( 'uncode_append_custom_styles_to_head', false ) ? true : false;

		return $append_inline;
	}
}

/**
 * Search section keys on the array and add the correct section ID.
 */
function uncode_core_replace_section_id( $section_id, $section ) {
	if ( is_array( $section ) ) {
		$new_section = array();

		foreach ( $section as $key => $value ) {
			if ( $key === 'id' || $key === 'section' || $key === 'condition' ) {
				$value = str_replace( '%section%', $section_id, $value );
			}
			$new_section[$key] = $value;
		}

		$section = $new_section;
	} else {
		$section = str_replace( '%section%', $section_id, $section );
	}

	return $section;
}

/**
 * Get an array of all Content Blocks to use in admin dropdowns.
 */
function uncode_core_get_uncodeblocks_for_dropdowns() {
	if ( apply_filters( 'uncode_core_use_text_fields_for_cpt_selects', false ) ) {
		return array();
	}

	global $uncode_contentblocks_for_dropdowns;

	if ( is_null( $uncode_contentblocks_for_dropdowns ) ) {
		$uncode_contentblocks_for_dropdowns = array();

		$blocks_query = new WP_Query( 'post_type=uncodeblock&posts_per_page=-1&post_status=any&orderby=title&order=ASC' );

		foreach ( $blocks_query->posts as $block ) {
			$frontend_link = function_exists( 'vc_frontend_editor' ) ? vc_frontend_editor()->getInlineUrl( '', $block->ID ) : '';

			$uncode_contentblocks_for_dropdowns[] = array(
				'value'        => $block->ID,
				'label'        => $block->post_title,
				'postlink'     => get_edit_post_link($block->ID),
				'frontendlink' => $frontend_link,
			);
		}

		if ( $blocks_query->post_count === 0 ) {
			$uncode_contentblocks_for_dropdowns = false;
		}
	}

	return $uncode_contentblocks_for_dropdowns;
}

/**
 * Get an array of all Pages to use in admin dropdowns.
 */
function uncode_core_get_pages_for_dropdowns( $default = false ) {
	if ( apply_filters( 'uncode_core_use_text_fields_for_cpt_selects', false ) ) {
		return array();
	}

	global $uncode_pages_for_dropdowns;

	if ( is_null( $uncode_pages_for_dropdowns ) ) {
		$uncode_pages_for_dropdowns = array(
			array(
				'value' => '',
				'label' => $default ? $default : esc_html__('Select…', 'uncode-core')
			),
		);

		$allpages_query = new WP_Query( 'post_type=page&posts_per_page=-1&post_status=any&orderby=title&order=ASC' );

		foreach ($allpages_query->posts as $page_queried) {
			$frontend_link = function_exists( 'vc_frontend_editor' ) ? vc_frontend_editor()->getInlineUrl( '', $page_queried->ID ) : '';

			$uncode_pages_for_dropdowns[] = array(
				'value'        => $page_queried->ID,
				'label'        => $page_queried->post_title,
				'postlink'     => get_edit_post_link($page_queried->ID),
				'frontendlink' => $frontend_link,
			);
		}

		if ($allpages_query->post_count === 0) {
			$uncode_pages_for_dropdowns = false;
		}
	}

	return $uncode_pages_for_dropdowns;
}

/**
 * Get an array of all Menus to use in admin dropdowns.
 */
function uncode_core_get_menus_for_dropdowns() {
	if ( apply_filters( 'uncode_core_use_text_fields_for_cpt_selects', false ) ) {
		return array();
	}

	global $uncode_menus_for_dropdowns;

	if ( is_null( $uncode_menus_for_dropdowns ) ) {
		$menus = get_terms( 'nav_menu', array( 'hide_empty' => true ) );
		$uncode_menus_for_dropdowns = array();
		$uncode_menus_for_dropdowns[] = array(
			'value' => '',
			'label' => esc_html__('Inherit', 'uncode-core')
		);
		foreach ($menus as $menu) {
			$uncode_menus_for_dropdowns[] = array(
				'value' => $menu->slug,
				'label' => $menu->name
			);
		}
	}

	return $uncode_menus_for_dropdowns;
}
