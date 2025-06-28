<?php 
function remove_customTypes(){
    unregister_post_type( 'uncode_gallery' );
    unregister_post_type('portfolio');
}
add_action('init','remove_customTypes');


/* ADD CONTACTOS */
function postType_Contactos(){
    register_post_type('contactos',array(
        'label'                 => __( 'Contact', 'miew' ),
        'description'           => __( 'Contactos from your customers.', 'miew' ),
        'labels' => array(
            'name'                  => _x( 'Contactos', 'Post Type General Name', 'miew' ),
            'singular_name'         => _x( 'Contact', 'Post Type Singular Name', 'miew' ),
            'menu_name'             => __( 'Contactos', 'miew' ),
            'name_admin_bar'        => __( 'Contact', 'miew' ),
            'archives'              => __( 'Contact Archives', 'miew' ),
            'parent_item_colon'     => __( 'Parent Contact:', 'miew' ),
            'all_items'             => __( 'All Contactos', 'miew' ),
            'add_new_item'          => __( 'Add New Contactos', 'miew' ),
            'add_new'               => __( 'Add New', 'miew' ),
            'new_item'              => __( 'New Contact', 'miew' ),
            'edit_item'             => __( 'Edit Contact', 'miew' ),
            'update_item'           => __( 'Update Contact', 'miew' ),
            'view_item'             => __( 'View Contact', 'miew' ),
            'search_items'          => __( 'Search Contact', 'miew' ),
            'not_found'             => __( 'Not found', 'miew' ),
            'not_found_in_trash'    => __( 'Not found in Trash', 'miew' ),
            'featured_image'        => __( 'Featured Image', 'miew' ),
            'set_featured_image'    => __( 'Set featured image', 'miew' ),
            'remove_featured_image' => __( 'Remove featured image', 'miew' ),
            'use_featured_image'    => __( 'Use as featured image', 'miew' ),
            'insert_into_item'      => __( 'Insert into Contact', 'miew' ),
            'uploaded_to_this_item' => __( 'Uploaded to this Contact', 'miew' ),
            'items_list'            => __( 'Contactos list', 'miew' ),
            'items_list_navigation' => __( 'Contactos list navigation', 'miew' ),
            'filter_items_list'     => __( 'Filter Contactos list', 'miew' ),
        ),
        'supports'              => array( 'title', 'editor'),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 21,
        'menu_icon'             => 'dashicons-phone',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => false,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'query_var'             => 'contactos',
        'rewrite' => array( 
            'slug'                  => 'contactos',
            'with_front'            => false,
            'pages'                 => false,
            'feeds'                 => false,
        ),
    ));
} add_action('init', 'postType_Contactos');

/* ADD PROGRAMAS */
function postType_Programas(){
    register_post_type('programas',array(
        'label'                 => __( 'Programas', 'miew' ),
        'description'           => __( 'Programas from your customers.', 'miew' ),
        'labels' => array(
            'name'                  => _x( 'Programas', 'Post Type General Name', 'miew' ),
            'singular_name'         => _x( 'Programa', 'Post Type Singular Name', 'miew' ),
            'menu_name'             => __( 'Programas', 'miew' ),
            'name_admin_bar'        => __( 'Programa', 'miew' ),
            'archives'              => __( 'Programa Archives', 'miew' ),
            'parent_item_colon'     => __( 'Parent Programa:', 'miew' ),
            'all_items'             => __( 'All Programas', 'miew' ),
            'add_new_item'          => __( 'Add New Programas', 'miew' ),
            'add_new'               => __( 'Add New', 'miew' ),
            'new_item'              => __( 'New Programa', 'miew' ),
            'edit_item'             => __( 'Edit Programa', 'miew' ),
            'update_item'           => __( 'Update Programa', 'miew' ),
            'view_item'             => __( 'View Programa', 'miew' ),
            'search_items'          => __( 'Search Programa', 'miew' ),
            'not_found'             => __( 'Not found', 'miew' ),
            'not_found_in_trash'    => __( 'Not found in Trash', 'miew' ),
            'featured_image'        => __( 'Featured Image', 'miew' ),
            'set_featured_image'    => __( 'Set featured image', 'miew' ),
            'remove_featured_image' => __( 'Remove featured image', 'miew' ),
            'use_featured_image'    => __( 'Use as featured image', 'miew' ),
            'insert_into_item'      => __( 'Insert into Programa', 'miew' ),
            'uploaded_to_this_item' => __( 'Uploaded to this Programa', 'miew' ),
            'items_list'            => __( 'Programas list', 'miew' ),
            'items_list_navigation' => __( 'Programas list navigation', 'miew' ),
            'filter_items_list'     => __( 'Filter Programas list', 'miew' ),
        ),
        'supports'              => array( 'title', 'editor', 'thumbnail'),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 21,
        'menu_icon'             => 'dashicons-welcome-learn-more',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => false,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'query_var'             => 'programas',
        'rewrite' => array( 
            'slug'                  => 'programas',
            'with_front'            => false,
            'pages'                 => false,
            'feeds'                 => false,
        ),
    ));
    
} add_action('init', 'postType_Programas');

/* ADD EMPRESAS */
function postType_Equipa(){
    register_post_type('equipa',array(
        'label'                 => __( 'Equipa', 'miew' ),
        'description'           => __( 'Equipa from your customers.', 'miew' ),
        'labels' => array(
            'name'                  => _x( 'Equipa', 'Post Type General Name', 'miew' ),
            'singular_name'         => _x( 'Equipa', 'Post Type Singular Name', 'miew' ),
            'menu_name'             => __( 'Equipa', 'miew' ),
            'name_admin_bar'        => __( 'Equipa', 'miew' ),
            'archives'              => __( 'Equipa Archives', 'miew' ),
            'parent_item_colon'     => __( 'Parent Equipa:', 'miew' ),
            'all_items'             => __( 'All Equipa', 'miew' ),
            'add_new_item'          => __( 'Add New Equipa', 'miew' ),
            'add_new'               => __( 'Add New', 'miew' ),
            'new_item'              => __( 'New Equipa', 'miew' ),
            'edit_item'             => __( 'Edit Equipa', 'miew' ),
            'update_item'           => __( 'Update Equipa', 'miew' ),
            'view_item'             => __( 'View Equipa', 'miew' ),
            'search_items'          => __( 'Search Equipa', 'miew' ),
            'not_found'             => __( 'Not found', 'miew' ),
            'not_found_in_trash'    => __( 'Not found in Trash', 'miew' ),
            'featured_image'        => __( 'Featured Image', 'miew' ),
            'set_featured_image'    => __( 'Set featured image', 'miew' ),
            'remove_featured_image' => __( 'Remove featured image', 'miew' ),
            'use_featured_image'    => __( 'Use as featured image', 'miew' ),
            'insert_into_item'      => __( 'Insert into Equipa', 'miew' ),
            'uploaded_to_this_item' => __( 'Uploaded to this Equipa', 'miew' ),
            'items_list'            => __( 'Equipa list', 'miew' ),
            'items_list_navigation' => __( 'Equipa list navigation', 'miew' ),
            'filter_items_list'     => __( 'Filter Equipa list', 'miew' ),
        ),
        'supports'              => array( 'title', 'thumbnail',),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 21,
        'menu_icon'             => 'dashicons-groups',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => false,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'query_var'             => 'equipa',
        'rewrite' => array( 
            'slug'                  => 'equipa',
            'with_front'            => false,
            'pages'                 => false,
            'feeds'                 => false,
        ),
    ));
    //flush_rewrite_rules();
} add_action('init', 'postType_Equipa');

/* ADD CENTROS */
function postType_Centros(){
    register_post_type('centros',array(
        'label'                 => __( 'Centros', 'miew' ),
        'description'           => __( 'Centros from your customers.', 'miew' ),
        'labels' => array(
            'name'                  => _x( 'Centros', 'Post Type General Name', 'miew' ),
            'singular_name'         => _x( 'Centro', 'Post Type Singular Name', 'miew' ),
            'menu_name'             => __( 'Centros', 'miew' ),
            'name_admin_bar'        => __( 'Centro', 'miew' ),
            'archives'              => __( 'Centro Archives', 'miew' ),
            'parent_item_colon'     => __( 'Parent Centro:', 'miew' ),
            'all_items'             => __( 'All Centros', 'miew' ),
            'add_new_item'          => __( 'Add New Centros', 'miew' ),
            'add_new'               => __( 'Add New', 'miew' ),
            'new_item'              => __( 'New Centro', 'miew' ),
            'edit_item'             => __( 'Edit Centro', 'miew' ),
            'update_item'           => __( 'Update Centro', 'miew' ),
            'view_item'             => __( 'View Centro', 'miew' ),
            'search_items'          => __( 'Search Centro', 'miew' ),
            'not_found'             => __( 'Not found', 'miew' ),
            'not_found_in_trash'    => __( 'Not found in Trash', 'miew' ),
            'featured_image'        => __( 'Featured Image', 'miew' ),
            'set_featured_image'    => __( 'Set featured image', 'miew' ),
            'remove_featured_image' => __( 'Remove featured image', 'miew' ),
            'use_featured_image'    => __( 'Use as featured image', 'miew' ),
            'insert_into_item'      => __( 'Insert into Centro', 'miew' ),
            'uploaded_to_this_item' => __( 'Uploaded to this Centro', 'miew' ),
            'items_list'            => __( 'Centros list', 'miew' ),
            'items_list_navigation' => __( 'Centros list navigation', 'miew' ),
            'filter_items_list'     => __( 'Filter Centros list', 'miew' ),
        ),
        'supports'              => array( 'title', 'editor', 'thumbnail'),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 21,
        'menu_icon'             => 'dashicons-building',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => false,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'query_var'             => 'centros',
        'rewrite' => array( 
            'slug'                  => 'centros',
            'with_front'            => false,
            'pages'                 => false,
            'feeds'                 => false,
        ),
    ));
    
} add_action('init', 'postType_Centros');


/* ADD PARCEIROS */
function postType_Parceiros(){
    register_post_type('parceiros',array(
        'label'                 => __( 'Parceiros', 'miew' ),
        'description'           => __( 'Parceiros from your customers.', 'miew' ),
        'labels' => array(
            'name'                  => _x( 'Parceiros', 'Post Type General Name', 'miew' ),
            'singular_name'         => _x( 'Parceiro', 'Post Type Singular Name', 'miew' ),
            'menu_name'             => __( 'Parceiros', 'miew' ),
            'name_admin_bar'        => __( 'Parceiro', 'miew' ),
            'archives'              => __( 'Parceiro Archives', 'miew' ),
            'parent_item_colon'     => __( 'Parent Parceiro:', 'miew' ),
            'all_items'             => __( 'All Parceiros', 'miew' ),
            'add_new_item'          => __( 'Add New Parceiros', 'miew' ),
            'add_new'               => __( 'Add New', 'miew' ),
            'new_item'              => __( 'New Parceiro', 'miew' ),
            'edit_item'             => __( 'Edit Parceiro', 'miew' ),
            'update_item'           => __( 'Update Parceiro', 'miew' ),
            'view_item'             => __( 'View Parceiro', 'miew' ),
            'search_items'          => __( 'Search Parceiro', 'miew' ),
            'not_found'             => __( 'Not found', 'miew' ),
            'not_found_in_trash'    => __( 'Not found in Trash', 'miew' ),
            'featured_image'        => __( 'Featured Image', 'miew' ),
            'set_featured_image'    => __( 'Set featured image', 'miew' ),
            'remove_featured_image' => __( 'Remove featured image', 'miew' ),
            'use_featured_image'    => __( 'Use as featured image', 'miew' ),
            'insert_into_item'      => __( 'Insert into Parceiro', 'miew' ),
            'uploaded_to_this_item' => __( 'Uploaded to this Parceiro', 'miew' ),
            'items_list'            => __( 'Parceiros list', 'miew' ),
            'items_list_navigation' => __( 'Parceiros list navigation', 'miew' ),
            'filter_items_list'     => __( 'Filter Parceiros list', 'miew' ),
        ),
        'supports'              => array( 'title', 'thumbnail',),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 21,
        'menu_icon'             => 'dashicons-groups',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => false,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'query_var'             => 'parceiros',
        'rewrite' => array( 
            'slug'                  => 'parceiros',
            'with_front'            => true,
            'pages'                 => true,
            'feeds'                 => true,
        ),
    ));
    //flush_rewrite_rules();
} add_action('init', 'postType_Parceiros');


/* ADD EMPRESAS */
function postType_Empresas(){
    register_post_type('empresas',array(
        'label'                 => __( 'Empresas', 'miew' ),
        'description'           => __( 'Empresas from your customers.', 'miew' ),
        'labels' => array(
            'name'                  => _x( 'Empresas', 'Post Type General Name', 'miew' ),
            'singular_name'         => _x( 'Empresa', 'Post Type Singular Name', 'miew' ),
            'menu_name'             => __( 'Empresas', 'miew' ),
            'name_admin_bar'        => __( 'Empresa', 'miew' ),
            'archives'              => __( 'Empresa Archives', 'miew' ),
            'parent_item_colon'     => __( 'Parent Empresa:', 'miew' ),
            'all_items'             => __( 'All Empresas', 'miew' ),
            'add_new_item'          => __( 'Add New Empresas', 'miew' ),
            'add_new'               => __( 'Add New', 'miew' ),
            'new_item'              => __( 'New Empresa', 'miew' ),
            'edit_item'             => __( 'Edit Empresa', 'miew' ),
            'update_item'           => __( 'Update Empresa', 'miew' ),
            'view_item'             => __( 'View Empresa', 'miew' ),
            'search_items'          => __( 'Search Empresa', 'miew' ),
            'not_found'             => __( 'Not found', 'miew' ),
            'not_found_in_trash'    => __( 'Not found in Trash', 'miew' ),
            'featured_image'        => __( 'Featured Image', 'miew' ),
            'set_featured_image'    => __( 'Set featured image', 'miew' ),
            'remove_featured_image' => __( 'Remove featured image', 'miew' ),
            'use_featured_image'    => __( 'Use as featured image', 'miew' ),
            'insert_into_item'      => __( 'Insert into Empresa', 'miew' ),
            'uploaded_to_this_item' => __( 'Uploaded to this Empresa', 'miew' ),
            'items_list'            => __( 'Empresas list', 'miew' ),
            'items_list_navigation' => __( 'Empresas list navigation', 'miew' ),
            'filter_items_list'     => __( 'Filter Empresas list', 'miew' ),
        ),
        'supports'              => array( 'title', 'editor', 'thumbnail',),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 21,
        'menu_icon'             => 'dashicons-groups',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => false,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'query_var'             => 'empresas',
        'rewrite' => array( 
            'slug'                  => 'empresas',
            'with_front'            => true,
            'pages'                 => true,
            'feeds'                 => true,
        ),
    ));
    register_taxonomy_for_object_type( 'post_tag', 'empresas' );
    //flush_rewrite_rules();
} add_action('init', 'postType_Empresas');

/* ADD JOBS */
function postType_Jobs(){
    register_post_type('jobs',array(
        'label'                 => __( 'Jobs', 'miew' ),
        'description'           => __( 'Jobs from your customers.', 'miew' ),
        'labels' => array(
            'name'                  => _x( 'Jobs', 'Post Type General Name', 'miew' ),
            'singular_name'         => _x( 'Job', 'Post Type Singular Name', 'miew' ),
            'menu_name'             => __( 'Jobs', 'miew' ),
            'name_admin_bar'        => __( 'Job', 'miew' ),
            'archives'              => __( 'Job Archives', 'miew' ),
            'parent_item_colon'     => __( 'Parent Job:', 'miew' ),
            'all_items'             => __( 'All Jobs', 'miew' ),
            'add_new_item'          => __( 'Add New Jobs', 'miew' ),
            'add_new'               => __( 'Add New', 'miew' ),
            'new_item'              => __( 'New Job', 'miew' ),
            'edit_item'             => __( 'Edit Job', 'miew' ),
            'update_item'           => __( 'Update Job', 'miew' ),
            'view_item'             => __( 'View Job', 'miew' ),
            'search_items'          => __( 'Search Job', 'miew' ),
            'not_found'             => __( 'Not found', 'miew' ),
            'not_found_in_trash'    => __( 'Not found in Trash', 'miew' ),
            'featured_image'        => __( 'Featured Image', 'miew' ),
            'set_featured_image'    => __( 'Set featured image', 'miew' ),
            'remove_featured_image' => __( 'Remove featured image', 'miew' ),
            'use_featured_image'    => __( 'Use as featured image', 'miew' ),
            'insert_into_item'      => __( 'Insert into Job', 'miew' ),
            'uploaded_to_this_item' => __( 'Uploaded to this Job', 'miew' ),
            'items_list'            => __( 'Jobs list', 'miew' ),
            'items_list_navigation' => __( 'Jobs list navigation', 'miew' ),
            'filter_items_list'     => __( 'Filter Jobs list', 'miew' ),
        ),
        'supports'              => array( 'title'),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 21,
        'menu_icon'             => 'dashicons-businessman',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => false,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'query_var'             => 'jobs',
        'rewrite' => array( 
            'slug'                  => 'jobs',
            'with_front'            => false,
            'pages'                 => false,
            'feeds'                 => false,
        ),
    ));
    
    register_taxonomy( 'jobs-category', array( 'jobs' ), array(
        'labels' => array(
            'name'                       => _x( 'Jobs Categories', 'Taxonomy General Name', 'miew-theme' ),
            'singular_name'              => _x( 'Jobs Category', 'Taxonomy Singular Name', 'miew-theme' ),
            'menu_name'                  => __( 'Categories', 'miew-theme' ),
            'all_items'                  => __( 'All Categories', 'miew-theme' ),
            'parent_item'                => __( 'Parent Category', 'miew-theme' ),
            'parent_item_colon'          => __( 'Parent Category:', 'miew-theme' ),
            'new_item_name'              => __( 'New Category Name', 'miew-theme' ),
            'add_new_item'               => __( 'Add New Category', 'miew-theme' ),
            'edit_item'                  => __( 'Edit Category', 'miew-theme' ),
            'update_item'                => __( 'Update Category', 'miew-theme' ),
            'view_item'                  => __( 'View Category', 'miew-theme' ),
            'separate_items_with_commas' => __( 'Separate Categories with commas', 'miew-theme' ),
            'add_or_remove_items'        => __( 'Add or remove Categories', 'miew-theme' ),
            'choose_from_most_used'      => __( 'Choose from the most used', 'miew-theme' ),
            'popular_items'              => __( 'Popular Categories', 'miew-theme' ),
            'search_items'               => __( 'Search Categories', 'miew-theme' ),
            'not_found'                  => __( 'Not Found', 'miew-theme' ),
            'no_terms'                   => __( 'No Categories', 'miew-theme' ),
            'items_list'                 => __( 'Items list', 'miew-theme' ),
            'items_list_navigation'      => __( 'Items list navigation', 'miew-theme' ),
        ),
        'hierarchical'               => true,
        'public'                     => true,
        'show_ui'                    => true,
        'has_archive'                => 'jobs-category',        
        'show_admin_column'          => true,
        'show_in_nav_menus'          => true,
        'show_tagcloud'              => true,
        'query_var'                  => 'jobs-category',
        'rewrite'                    => array(
            'slug'                       => 'jobs-category',
            'with_front'                 => true,
            'hierarchical'               => false,
        ),
    ));

    register_taxonomy_for_object_type( 'post_tag', 'jobs' );
} add_action('init', 'postType_Jobs');


/* ADD PUBLICACOES */
// function postType_Publicacoes(){
//     register_post_type('publicacoes',array(
//         'label'                 => __( 'Publicação', 'miew' ),
//         'description'           => __( 'Publicações from your customers.', 'miew' ),
//         'labels' => array(
//             'name'                  => _x( 'Publicações', 'Post Type General Name', 'miew' ),
//             'singular_name'         => _x( 'Publicação', 'Post Type Singular Name', 'miew' ),
//             'menu_name'             => __( 'Publicações', 'miew' ),
//             'name_admin_bar'        => __( 'Publicação', 'miew' ),
//             'archives'              => __( 'Publicação Archives', 'miew' ),
//             'parent_item_colon'     => __( 'Parent Publicação:', 'miew' ),
//             'all_items'             => __( 'All Publicações', 'miew' ),
//             'add_new_item'          => __( 'Add New Publicações', 'miew' ),
//             'add_new'               => __( 'Add New', 'miew' ),
//             'new_item'              => __( 'New Publicação', 'miew' ),
//             'edit_item'             => __( 'Edit Publicação', 'miew' ),
//             'update_item'           => __( 'Update Publicação', 'miew' ),
//             'view_item'             => __( 'View Publicação', 'miew' ),
//             'search_items'          => __( 'Search Publicação', 'miew' ),
//             'not_found'             => __( 'Not found', 'miew' ),
//             'not_found_in_trash'    => __( 'Not found in Trash', 'miew' ),
//             'featured_image'        => __( 'Featured Image', 'miew' ),
//             'set_featured_image'    => __( 'Set featured image', 'miew' ),
//             'remove_featured_image' => __( 'Remove featured image', 'miew' ),
//             'use_featured_image'    => __( 'Use as featured image', 'miew' ),
//             'insert_into_item'      => __( 'Insert into Publicação', 'miew' ),
//             'uploaded_to_this_item' => __( 'Uploaded to this Publicação', 'miew' ),
//             'items_list'            => __( 'Publicações list', 'miew' ),
//             'items_list_navigation' => __( 'Publicações list navigation', 'miew' ),
//             'filter_items_list'     => __( 'Filter Publicações list', 'miew' ),
//         ),
//         'supports'              => array( 'title'),
//         'hierarchical'          => false,
//         'public'                => true,
//         'show_ui'               => true,
//         'show_in_menu'          => true,
//         'menu_position'         => 20,
//         'menu_icon'             => 'dashicons-media-default',
//         'show_in_admin_bar'     => true,
//         'show_in_nav_menus'     => true,
//         'can_export'            => true,
//         'has_archive'           => false,
//         'exclude_from_search'   => false,
//         'publicly_queryable'    => true,
//         'query_var'             => 'publicacoes',
//         'rewrite' => array( 
//             'slug'                  => 'publicacoes',
//             'with_front'            => false,
//             'pages'                 => false,
//             'feeds'                 => false,
//         ),
//     ));

//     register_taxonomy( 'publicacoes-category', array( 'publicacoes' ), array(
//         'labels' => array(
//             'name'                       => _x( 'Publicações Categories', 'Taxonomy General Name', 'miew-theme' ),
//             'singular_name'              => _x( 'Publicações Category', 'Taxonomy Singular Name', 'miew-theme' ),
//             'menu_name'                  => __( 'Categories', 'miew-theme' ),
//             'all_items'                  => __( 'All Categories', 'miew-theme' ),
//             'parent_item'                => __( 'Parent Category', 'miew-theme' ),
//             'parent_item_colon'          => __( 'Parent Category:', 'miew-theme' ),
//             'new_item_name'              => __( 'New Category Name', 'miew-theme' ),
//             'add_new_item'               => __( 'Add New Category', 'miew-theme' ),
//             'edit_item'                  => __( 'Edit Category', 'miew-theme' ),
//             'update_item'                => __( 'Update Category', 'miew-theme' ),
//             'view_item'                  => __( 'View Category', 'miew-theme' ),
//             'separate_items_with_commas' => __( 'Separate Categories with commas', 'miew-theme' ),
//             'add_or_remove_items'        => __( 'Add or remove Categories', 'miew-theme' ),
//             'choose_from_most_used'      => __( 'Choose from the most used', 'miew-theme' ),
//             'popular_items'              => __( 'Popular Categories', 'miew-theme' ),
//             'search_items'               => __( 'Search Categories', 'miew-theme' ),
//             'not_found'                  => __( 'Not Found', 'miew-theme' ),
//             'no_terms'                   => __( 'No Categories', 'miew-theme' ),
//             'items_list'                 => __( 'Items list', 'miew-theme' ),
//             'items_list_navigation'      => __( 'Items list navigation', 'miew-theme' ),
//         ),
//         'hierarchical'               => true,
//         'public'                     => true,
//         'show_ui'                    => true,
//         'has_archive'                => 'publicacoes-category',        
//         'show_admin_column'          => true,
//         'show_in_nav_menus'          => true,
//         'show_tagcloud'              => true,
//         'query_var'                  => 'publicacoes-category',
//         'rewrite'                    => array(
//             'slug'                       => 'publicacoes-category',
//             'with_front'                 => true,
//             'hierarchical'               => false,
//         ),
//     ));
// } add_action('init', 'postType_Publicacoes');



/*remove archive from titles*/
add_filter('get_the_archive_title', function ($title) {
    if ( is_category() ) {
        $title = single_cat_title( '', false );
    } elseif ( is_tag() ) {
        $title = single_tag_title( '', false );
    } elseif ( is_author() ) {
        $title = '<span class="vcard">' . get_the_author() . '</span>';
    } elseif ( is_year() ) {
        $title = get_the_date( _x( 'Y', 'yearly archives date format' ) );
    } elseif ( is_month() ) {
        $title = get_the_date( _x( 'F Y', 'monthly archives date format' ) );
    } elseif ( is_day() ) {
        $title = get_the_date( _x( 'F j, Y', 'daily archives date format' ) );
    } elseif ( is_tax( 'post_format' ) ) {
        if ( is_tax( 'post_format', 'post-format-aside' ) ) {
            $title = _x( 'Asides', 'post format archive title' );
        } elseif ( is_tax( 'post_format', 'post-format-gallery' ) ) {
            $title = _x( 'Galleries', 'post format archive title' );
        } elseif ( is_tax( 'post_format', 'post-format-image' ) ) {
            $title = _x( 'Images', 'post format archive title' );
        } elseif ( is_tax( 'post_format', 'post-format-video' ) ) {
            $title = _x( 'Videos', 'post format archive title' );
        } elseif ( is_tax( 'post_format', 'post-format-quote' ) ) {
            $title = _x( 'Quotes', 'post format archive title' );
        } elseif ( is_tax( 'post_format', 'post-format-link' ) ) {
            $title = _x( 'Links', 'post format archive title' );
        } elseif ( is_tax( 'post_format', 'post-format-status' ) ) {
            $title = _x( 'Statuses', 'post format archive title' );
        } elseif ( is_tax( 'post_format', 'post-format-audio' ) ) {
            $title = _x( 'Audio', 'post format archive title' );
        } elseif ( is_tax( 'post_format', 'post-format-chat' ) ) {
            $title = _x( 'Chats', 'post format archive title' );
        }
    } elseif ( is_post_type_archive() ) {
        $title = post_type_archive_title( '', false );
    } elseif ( is_tax() ) {
        $title = single_term_title( '', false );
    } else {
        $title = __( 'Archives', 'miew' );
    }
    return $title;
});
?>