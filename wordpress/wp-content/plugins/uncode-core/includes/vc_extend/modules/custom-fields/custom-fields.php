<?php
/**
 * Custom Fields config
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
$fields_font_size = $heading_size;
unset( $fields_font_size[ 'BigText' ] );

$font_size_custom = array (esc_html__('Custom', 'uncode-core') => 'custom');
$fields_font_size = array_merge( $fields_font_size, $font_size_custom );

$custom_field_color_options = uncode_core_vc_params_get_advanced_color_options( 'text_color', esc_html__("Text color", 'uncode-core'), esc_html__("Specify text color.", 'uncode-core'), esc_html__('Typography', 'uncode-core'), $uncode_colors, array( 'dependency' => array(
		'element' => 'custom_typo',
		'not_empty' => true,
	) ) );
list( $add_text_color_type, $add_text_color, $add_text_color_solid, $add_text_color_gradient ) = $custom_field_color_options;

$custom_fields_params = array(
	array(
		'type' => 'uncode_shortcode_id',
		'heading' => esc_html__('Unique ID', 'uncode-core') ,
		'param_name' => 'uncode_shortcode_id',
		'description' => '' ,
		'group' => esc_html__('General', 'uncode-core')
	) ,
	array(
		"type" => 'dropdown',
		"heading" => esc_html__("Post Type", 'uncode-core') ,
		"param_name" => "post_type",
		"admin_label" => true,
		"description" => esc_html__("Specify the Post Type the Custom Fields belong to. NB. Please specify the Post Type in which this module will be used.", 'uncode-core') ,
		"value" => $uncode_post_types_with_labels ,
		'group' => esc_html__('General', 'uncode-core')
	) ,
);

foreach ( $uncode_post_types_with_labels as $uncode_post_types_with_labels_key => $uncode_post_types_with_labels_value ) {
	$get_custom_fields        = ot_get_option( '_uncode_' . $uncode_post_types_with_labels_value . '_custom_fields' );
	$custom_fields_single_cpt = array(
		__( 'All', 'uncode-core' ) => ''
	);

	if ( is_array( $get_custom_fields ) ) {
		foreach ( $get_custom_fields as $custom_field ) {
			$custom_fields_single_cpt[$custom_field['title']] = $custom_field['_uncode_cf_unique_id'];
		}
	}

	$custom_fields_single_cpt_select = array(
		array(
			"type" => 'dropdown',
			"heading" => esc_html__("Custom Fields", 'uncode-core') ,
			"param_name" => "custom_fields_single_" . $uncode_post_types_with_labels_value,
			"description" => esc_html__("Specify the Custom Fields you want to show. NB. Please select a Custom Field that belong to the same Post Type where the module will be displayed.", 'uncode-core') ,
			"value" => $custom_fields_single_cpt ,
			'admin_label' => true,
			'group' => esc_html__('General', 'uncode-core') ,
			'dependency' => array(
				'element' => 'post_type',
				'value' => $uncode_post_types_with_labels_value
			),
		) ,
	);

	$custom_fields_params = array_merge( $custom_fields_params, $custom_fields_single_cpt_select );
}

$custom_fields_params = array_merge( $custom_fields_params, array(
	array(
		"type" => "textfield",
		"heading" => esc_html__("Manual values", 'uncode-core') ,
		"param_name" => "manual_values",
		"placeholder" => esc_html__("Type 'All' or add semicolon separated values (ex: 'custom-field-1;custom-field-2'). Default is 'All'", 'uncode-core') ,
		"description" => esc_html__("Add semicolon separated values (ex: 'custom-field-1;custom-field-2') to manually select the custom fields you want to show. NB. Works only when 'Custom Fields' is set to 'All'.", 'uncode-core') ,
		'group' => esc_html__('General', 'uncode-core') ,
	) ,
	array(
		"type" => 'dropdown',
		"heading" => esc_html__("Elements", 'uncode-core') ,
		"param_name" => "field_elements",
		"description" => esc_html__("Specify the elements you want to show.", 'uncode-core') ,
		"admin_label" => true,
		"value" => array(
			__( 'Label and value (legacy)', 'uncode-core' ) => '',
			__( 'Label (legacy)', 'uncode-core' ) => 'label',
			__( 'Value (legacy)', 'uncode-core' ) => 'value',
			__( 'Icon, label and value', 'uncode-core' ) => 'icon_label_value_new',
			__( 'Label and value', 'uncode-core' ) => 'label_value_new',
			__( 'Icon and value', 'uncode-core' ) => 'icon_value_new',
			__( 'Label', 'uncode-core' ) => 'label_new',
			__( 'Value', 'uncode-core' ) => 'value_new',
			__( 'Icon', 'uncode-core' ) => 'icon_new',
		) ,
		'group' => esc_html__('General', 'uncode-core') ,
	) ,
	array(
		"type" => 'textfield',
		"heading" => esc_html__("Columns", 'uncode-core') ,
		"param_name" => "columns",
		"placeholder" => esc_html__("Number of columns for each breakpoint (ex: '4,2,1')", 'uncode-core') ,
		"description" => esc_html__("Specify the number of columns for each breakpoint (ex: '4,2,1'). Default is one column. NB. Works only when 'Custom Fields' is set to 'All' and when 'Elements' is not set to a legacy value.", 'uncode-core') ,
		'group' => esc_html__('General', 'uncode-core') ,
	) ,
	array(
		'type' => 'checkbox',
		'heading' => esc_html__('Rounded icon', 'uncode-core') ,
		'param_name' => 'rounded_icon',
		'description' => esc_html__('Activate to add a rounded background to the icons.', 'uncode-core') ,
		'value' => array(
			esc_html__('Yes, please', 'uncode-core') => 'yes'
		) ,
		'group' => esc_html__('General', 'uncode-core') ,
		'dependency' => array(
			'element' => 'field_elements',
			'value' => array(
				'icon_label_value_new',
				'icon_value_new',
				'icon_new',
			)
		),
	) ,
	array(
		'type' => 'checkbox',
		'heading' => esc_html__('Custom typography', 'uncode-core') ,
		'param_name' => 'custom_typo',
		'description' => esc_html__('Define custom font settings.', 'uncode-core') ,
		'value' => array(
			esc_html__('Yes, please', 'uncode-core') => 'yes'
		) ,
		'group' => esc_html__('Typography', 'uncode-core') ,
		'dependency' => array(
			'element' => 'field_elements',
			'value' => array(
				'label',
				'value',
				'icon',
			)
		),
	) ,
	array(
		'type' => 'dropdown',
		'heading' => esc_html__('Text Display', 'uncode-core') ,
		'param_name' => 'text_display',
		'value' => array(
			esc_html__('Block', 'uncode-core') => '',
			esc_html__('Inline', 'uncode-core') => 'inline',
		) ,
		'group' => esc_html__('Typography', 'uncode-core') ,
		'description' => esc_html__('Specify the display mode.', 'uncode-core'),
		'dependency' => array(
			'element' => 'custom_typo',
			'not_empty' => true,
		),
	) ,
	$add_text_color_type,
	$add_text_color,
	$add_text_color_solid,
	$add_text_color_gradient,
	array(
		"type" => 'dropdown',
		"heading" => esc_html__("Text font family", 'uncode-core') ,
		"param_name" => "text_font",
		"description" => esc_html__("Specify text font family.", 'uncode-core') ,
		"value" => $heading_font,
		'std' => '',
		"group" => esc_html__("Typography", 'uncode-core') ,
		'dependency' => array(
			'element' => 'custom_typo',
			'not_empty' => true,
		),
	) ,
	array(
		"type" => 'dropdown',
		"heading" => esc_html__("Text size", 'uncode-core') ,
		"param_name" => "text_size",
		"description" => esc_html__("Specify a font size.", 'uncode-core') ,
		'std' => '',
		"value" => $fields_font_size,
		"group" => esc_html__("Typography", 'uncode-core') ,
		'dependency' => array(
			'element' => 'custom_typo',
			'not_empty' => true,
		),
	) ,
	array(
		'type' => 'textfield',
		'heading' => esc_html__('Custom Size', 'uncode-core') ,
		'param_name' => 'custom_size',
		'description' => esc_html__('Specify a custom font size, ex: clamp(30px,5vw,75px), 4em, etc.', 'uncode-core') ,
		'group' => esc_html__('Typography', 'uncode-core'),
		'dependency' => array(
			'element' => 'text_size',
			'value' => array('custom'),
		) ,
	) ,
	array(
		"type" => 'dropdown',
		"heading" => esc_html__("Text weight", 'uncode-core') ,
		"param_name" => "text_weight",
		"description" => esc_html__("Specify text weight.", 'uncode-core') ,
		"value" => $heading_weight,
		'std' => '',
		"group" => esc_html__("Typography", 'uncode-core') ,
		'dependency' => array(
			'element' => 'custom_typo',
			'not_empty' => true,
		),
	) ,
	array(
		"type" => 'dropdown',
		"heading" => esc_html__("Text transform", 'uncode-core') ,
		"param_name" => "text_transform",
		"description" => esc_html__("Specify the text transformation.", 'uncode-core') ,
		"value" => array(
			esc_html__('Default', 'uncode-core') => '',
			esc_html__('Uppercase', 'uncode-core') => 'uppercase',
			esc_html__('Lowercase', 'uncode-core') => 'lowercase',
			esc_html__('Capitalize', 'uncode-core') => 'capitalize'
		) ,
		"group" => esc_html__("Typography", 'uncode-core') ,
		'dependency' => array(
			'element' => 'custom_typo',
			'not_empty' => true,
		),
	) ,
	array(
		"type" => 'dropdown',
		"heading" => esc_html__("Text line height", 'uncode-core') ,
		"param_name" => "text_height",
		"description" => esc_html__("Specify text line height.", 'uncode-core') ,
		"value" => $heading_height,
		"group" => esc_html__("Typography", 'uncode-core') ,
		'dependency' => array(
			'element' => 'custom_typo',
			'not_empty' => true,
		),
	) ,
	array(
		"type" => 'dropdown',
		"heading" => esc_html__("Text letter spacing", 'uncode-core') ,
		"param_name" => "text_space",
		"description" => esc_html__("Specify text letter spacing.", 'uncode-core') ,
		"value" => $heading_space,
		"group" => esc_html__("Typography", 'uncode-core') ,
		'dependency' => array(
			'element' => 'custom_typo',
			'not_empty' => true,
		),
	) ,
	array(
		"type" => 'dropdown',
		"heading" => esc_html__("Text italic", 'uncode-core') ,
		"param_name" => "text_italic",
		"description" => esc_html__("Transform the text to italic.", 'uncode-core') ,
		"value" => array(
			esc_html__('Normal', 'uncode-core') => '',
			esc_html__('Italic', 'uncode-core') => 'yes',
		) ,
		"group" => esc_html__("Typography", 'uncode-core') ,
		'dependency' => array(
			'element' => 'custom_typo',
			'not_empty' => true,
		),
	) ,
) );

$extra_params = array(
	array(
		'type' => 'textfield',
		'heading' => esc_html__('Element ID', 'uncode-core') ,
		'param_name' => 'el_id',
		'description' => esc_html__('This value has to be unique. Change it in case it\'s needed.', 'uncode-core') ,
		"group" => esc_html__("Extra", 'uncode-core')
	) ,
	array(
		'type' => 'textfield',
		'heading' => esc_html__('Extra class name', 'uncode-core') ,
		'param_name' => 'el_class',
		'description' => esc_html__('If you wish to style particular content element differently, then use this field to add a class name and then refer to it in your CSS file.', 'uncode-core') ,
		"group" => esc_html__("Extra", 'uncode-core')
	) ,
);

$custom_fields_params = array_merge( $custom_fields_params, $extra_params );

vc_map(array(
	'name' => esc_html__('Custom Fields', 'uncode-core') ,
	'base' => 'uncode_custom_fields',
	'weight' => 9050,
	'icon' => 'fa fa-list-alt',
	'php_class_name' => 'uncode_custom_fields',
	'description' => esc_html__('Custom Fields Meta Data', 'uncode-core') ,
	'params' => $custom_fields_params ,
));
