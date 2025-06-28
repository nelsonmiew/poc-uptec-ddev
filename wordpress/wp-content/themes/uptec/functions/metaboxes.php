<?php 
function miew_metaboxes() {
    if( is_admin() ){
        $prefix = '';

        $centros_array = array();
        $centros = new WP_Query(array(
			'post_type' => 'centros',
			'post_status' => 'publish',
			'orderby' => 'menu_order',
			'order'   => 'ASC',
			'suppress_filters' => false,
            'posts_per_page' => '-1',            
        ));
        while ($centros->have_posts()) {
            $centros->the_post();
            $post_id = get_the_ID();
            $title  = get_the_title($post_id);

            if($title) $centros_array[$post_id] = $title; 
        }

        $empresas_array = array();
        $empresas = new WP_Query(array(
			'post_type' => 'empresas',
			'post_status' => 'publish',
			'orderby' => 'menu_order',
			'order'   => 'ASC',
			'suppress_filters' => false,
			'posts_per_page' => '-1',
        ));
        while ($empresas->have_posts()) {
            $empresas->the_post();
            $post_id = get_the_ID();
            $title  = get_the_title($post_id);

            if($title) $empresas_array[$post_id] = $title; 
        }

        /* PROGRAMAS */
        $cmb = new_cmb2_box( array(
            'id' => 'programas_metabox',
            'title' => __('Mais informação', 'uncode'),
            'object_types' => array('programas'), // programas type
            'context' => 'normal',
            'priority' => 'high',
            'show_names' => true,
            'fields' => array(
                array(
                    'name' => __('Data', 'uncode'),
                    'id'   => $prefix . 'programas_data',
                    'type' => 'text',
                ),
                array(
                    'name' => __('Link', 'uncode'),
                    'id'   => $prefix . 'programas_link',
                    'type' => 'text_url',
                    'protocols' => array( 'http', 'https'), // Array of allowed protocols

                )
            )
        ));


        /* EQUIPA */
        $cmb = new_cmb2_box( array(
            'id' => 'equipa_metabox',
            'title' => __('Mais informação', 'uncode'),
            'object_types' => array('equipa'), // equipa type
            'context' => 'normal',
            'priority' => 'high',
            'show_names' => true,
            'fields' => array(
                array(
                    'name' => __('Segunda Imagem', 'uncode'),
                    'id'   => $prefix . 'equipa_img',
                    'type'    => 'file',
                    'options' => array(
                        'url' => false, // Hide the text input for the url
                    ),
                    'text' => array(
                        'add_upload_file_text' => 'Adicionar imagem'
                    ),
                    'query_args' => array(
                        'type' => array(
                        	'image/gif',
                        	'image/jpeg',
                        	'image/png',
                        ),
                    )
                ),
                array(
                    'name' => __('Cargo', 'uncode'),
                    'id'   => $prefix . 'equipa_cargo',
                    'type' => 'text_medium',
                ),
                array(
                    'name' => __('Linkedin', 'uncode'),
                    'id'   => $prefix . 'equipa_linkedin',
                    'type' => 'text_url',
                    'protocols' => array( 'http', 'https'), // Array of allowed protocols
                )
            )
        ));



        /* CENTROS */
        $cmb = new_cmb2_box( array(
            'id' => 'centros_metabox',
            'title' => __('Mais informação', 'uncode'),
            'object_types' => array('centros'), // centros type
            'context' => 'normal',
            'priority' => 'high',
            'show_names' => true,
            'fields' => array(
                array(
                    'name' => __('Morada', 'uncode'),
                    'id'   => $prefix . 'centros_morada',
                    'type' => 'textarea',
                ),
                array(
                    'name' => __('Coordenadas', 'uncode'),
                    'id'   => $prefix . 'centros_coordenadas',
                    'type' => 'text_medium',
                ),
            )
        ));


        /* Empresas */
        $cmb = new_cmb2_box( array(
            'id' => 'empresas_metabox',
            'title' => __('Mais informação', 'uncode'),
            'object_types' => array('empresas'), // empresas type
            'context' => 'normal',
            'priority' => 'high',
            'show_names' => true,
            'fields' => array(
                array(
                    'name'    => __('Logotipo', 'uncode'),
                    'id'      => $prefix . 'empresas_logotipo',
                    'type'    => 'file',
                    'text'    => array(
                        'add_upload_file_text' => 'Adicionar Ficheiro' // Change upload button text. Default: "Add or Upload File"
                    ),
                    'query_args' => array(
                        'type' => array(
                        	'image/gif',
                        	'image/jpeg',
                        	'image/png',
                        ),
                    ),
                    'preview_size' => 'large', // Image size to use when previewing in the admin.
                ),
                array(
                    'name' => __('Tipo de agência', 'uncode'),
                    'id'   => $prefix . 'empresas_agencia',
                    'type' => 'text',
                ),
                array(
                    'name'           => __('Centro', 'uncode'),
                    'id'             => $prefix . 'empresas_center',
                    'type'           => 'select',
                    'show_option_none' => true,
                    'options'          => $centros_array,
                ),
                array(
                    'name' => __('Alumni', 'uncode'),
                    'id'   => $prefix . 'empresas_alumni',
                    'type' => 'checkbox',
                ),
                array(
                    'name' => __('Email', 'uncode'),
                    'id'   => $prefix . 'empresas_email',
                    'type' => 'text_email',
                ),
                array(
                    'name' => __('Contacto', 'uncode'),
                    'id'   => $prefix . 'empresas_contacto',
                    'type' => 'text',
                ),
                array(
                    'name' => __('Website', 'uncode'),
                    'id'   => $prefix . 'empresas_link',
                    'type' => 'text_url',
                    'protocols' => array( 'http', 'https'), // Array of allowed protocols
                ),
                array(
                    'name' => 'Icons list',
                    'desc' => '',
                    'id'   => 'icons_list',
                    'type' => 'file_list',
                    'preview_size' => array( 100, 100 ), // Default: array( 50, 50 )
                    // 'query_args' => array( 'type' => 'image' ), // Only images attachment
                )
            )
        ));

        

        /* JOBS */
        $cmb = new_cmb2_box( array(
            'id' => 'jobs_metabox',
            'title' => __('Mais informação', 'uncode'),
            'object_types' => array('jobs'), // jobs type
            'context' => 'normal',
            'priority' => 'high',
            'show_names' => true,
            'fields' => array(
                array(
                    'name' => __('Data Início', 'uncode'),
                    'id'   => $prefix . 'jobs_inicio',
                    'type' => 'text_date',
                    'date_format' => 'd/m/Y',
                ),
                array(
                    'name' => __('Data Fim', 'uncode'),
                    'id'   => $prefix . 'jobs_fim',
                    'type' => 'text_date',
                    'date_format' => 'd/m/Y',
                ),
                array(
                    'name'           => __('Empresa', 'uncode'),
                    'id'             => $prefix . 'jobs_empresa',
                    'type'           => 'select',
                    'show_option_none' => false,
                    'options'          => $empresas_array,
                ),
                array(
                    'name' => __('Email', 'uncode'),
                    'id'   => $prefix . 'jobs_email',
                    'type' => 'text_email',
                ),
                array(
                    'name' => __('Link', 'uncode'),
                    'id'   => $prefix . 'jobs_link',
                    'type' => 'text_url',
                )
            )
        ));

        /* PARCEIROS */
        $cmb = new_cmb2_box( array(
            'id' => 'parceiros_metabox',
            'title' => __('Mais informação', 'miew'),
            'object_types' => array('parceiros'), // parceiros type
            'context' => 'normal',
            'priority' => 'high',
            'show_names' => true,
            'fields' => array(
                array(
                    'name' => __('Link', 'miew'),
                    'id'   => $prefix . 'parceiros_link',
                    'type' => 'text_url',
	                'protocols' => array( 'http', 'https'), // Array of allowed protocols
                )
            )
        ));
    }
} add_action( 'cmb2_admin_init', 'miew_metaboxes' );

function wpdocs_register_meta_boxes() {
    add_meta_box( 'programas_metabox', __( 'Mais informação', 'uncode' ), 'wpdocs_my_display_callback', array( 'programas' ), 'advanced', 'default' );
    add_meta_box( 'empresas_metabox', __( 'Mais informação', 'uncode' ), 'wpdocs_my_display_callback', array( 'empresas' ), 'advanced', 'default' );
    add_meta_box( 'jobs_metabox', __( 'Mais informação', 'uncode' ), 'wpdocs_my_display_callback', array( 'jobs' ), 'advanced', 'default' );
    add_meta_box( 'parceiros_metabox', __( 'Mais informação', 'miew' ), 'wpdocs_my_display_callback', array( 'parceiros' ), 'advanced', 'default' );
} add_action( 'add_meta_boxes', 'wpdocs_register_meta_boxes' );
?>