<?php 
function mostraEntrada(){
    if(!session_id()) {
        session_start();
    }
    
    //check_ajax_referer( 'mostraEntrada_noonce', 'security' );

    //$_SESSION["mostra_entrada"] = "false";
    setcookie("mostra_entrada", "false", time()+(3600*24*2), COOKIEPATH, COOKIE_DOMAIN);

    exit;
}
add_action('wp_ajax_mostraEntrada', 'mostraEntrada');
add_action('wp_ajax_nopriv_mostraEntrada', 'mostraEntrada');

function getJobs(){
    if(!session_id()) {
        session_start();
    }

    ///if ( !wp_verify_nonce( $_REQUEST['security'], 'getJobs_noonce')) echo "falhou";
    //check_ajax_referer( 'getJobs_noonce', 'security' );

    $post_id = $_REQUEST['id'];
    $query2 = get_post_meta($post_id);
    $title = get_the_title($post_id);

    if($query2['jobs_link'][0]) $link = $query2['jobs_link'][0];    

    $empresas_id = $query2['jobs_empresa'][0];
    $query2 = get_post_meta($empresas_id);

    $empresaTitle  = get_the_title($empresas_id);
    if($query2['empresas_logotipo'][0]) $logo = $query2['empresas_logotipo'][0]; 
    if($query2['empresas_email'][0]) $email = $query2['empresas_email'][0];    
    if($query2['empresas_link'][0]) $site = $query2['empresas_link'][0];    
    if(!$link) $link  = get_the_permalink($empresas_id);

    $tags = "";
    $tag_ids = wp_get_post_tags( $post_id, array( 'fields' => 'ids' ) );
    if (!empty($tag_ids)) {
        $args = array(
            'smallest'                  => 14,
            'largest'                   => 14,
            'unit'                      => 'px',
            'include'                   => $tag_ids,
            'taxonomy'                  => 'post_tag',
            'echo'                      => false,
            'number' 					=> 999,
        );

        $tags = wp_tag_cloud($args);
    }

    $parallax = json_encode(array(
        "axis" => "y",
        "fixedTil" => "#detail",
    ));

    list($width, $height, $type, $attr) = getimagesize($logo);

    if($site){
        $smallInfo .= '<div class="margin-bottom-sm">
            <h4><strong>'.__('Website', 'uncode').'</strong></h4>
            <a class="texts" href="'.$site.'" target="_blank">'.removeHTTP($site).'</a>
        </div>';
    }

    $smallInfo .= '<div class="margin-bottom-sm">
        <h4><strong>'.__('Proposta', 'uncode').'</strong></h4>
        <p>'.$title.'</a>
    </div>';

    if($tags){
        $smallInfo .= '<div class="margin-bottom-sm">
            <h4><strong>'.__('Tags', 'uncode').'</strong></h4>
            <div class="tags white">'.$tags.'</div>
        </div>';
    }
    if($email){
        $smallInfo .= '<div class="margin-bottom-sm">
            <h4><strong>'.__('Email', 'uncode').'</strong></h4>
            <a class="texts" href="mailto:'.$email.'">'.$email.'</a>
        </div>';
    }

    $innerHtml = '<div class="detail_div jobs_detalhe" id="empresa_'.$post_id.'" data-parallax='.$parallax.'>
        <img class="grayscale margin-bottom-md" src="'.$logo.'" width="100%" alt="'.$empresaTitle.'" title="'.$empresaTitle.'" style="max-width:'.$width.'px" />
        '.$smallInfo.'
        <a class="button margin-top-sm" href="'.$link.'" target="_blank">'.__('Know more', 'uncode').'</a>
    </div>';

    echo $innerHtml;
    exit();
}
add_action('wp_ajax_getJobs', 'getJobs');
add_action('wp_ajax_nopriv_getJobs', 'getJobs');

function getEmpresas(){
    if(!session_id()) {
        session_start();
    }

    //if ( !wp_verify_nonce( $_REQUEST['security'], 'getEmpresas_noonce')) echo "falhou";
    //check_ajax_referer( 'getEmpresas_noonce', 'security' );

    $post_id = $_REQUEST['id'];
    $query2 = get_post_meta($post_id);
    $agencia = get_the_title($post_id);
    
    if($query2['empresas_logotipo'][0]) $logo = $query2['empresas_logotipo'][0];    
    if($query2['empresas_agencia'][0]) $agencia = $query2['empresas_agencia'][0];    
    if($query2['empresas_email'][0]) $email = $query2['empresas_email'][0];     
    if($query2['empresas_alumni'][0]) $alumni = $query2['empresas_alumni'][0];    
    if($query2['empresas_contacto'][0]) $phone = $query2['empresas_contacto'][0];    
    if($query2['empresas_link'][0]) $site = $query2['empresas_link'][0];    
    $link  = get_the_permalink($post_id);

    $tags = "";
    $tag_ids = wp_get_post_tags( $post_id, array( 'fields' => 'ids' ) );
    if (!empty($tag_ids)) {
        $args = array(
            'smallest'                  => 14,
            'largest'                   => 14,
            'unit'                      => 'px',
            'include'                   => $tag_ids,
            'taxonomy'                  => 'post_tag',
            'echo'                      => false,
            'number' 					=> 999,
        );

        $tags = wp_tag_cloud($args);
    }
    
    $parallax = json_encode(array(
        "axis" => "y",
        "fixedTil" => "#detail",
    ));

    $smallInfo = "";
    if($alumni==="on"){
        $alumni = '<div class="margin-bottom-sm">
            <span class="texts alumni-info">'.__('Alumni', 'uncode').'</span>
        </div>';
    }
    if($email){
        $smallInfo .= '<div class="margin-bottom-sm">
            <h4><strong>'.__('Email', 'uncode').'</strong></h4>
            <a class="texts" href="mailto:'.$email.'">'.$email.'</a>
        </div>';
    }
    if($contacto){
        $smallInfo .= '<div class="margin-bottom-sm">
            <h4><strong>'.__('Phone', 'uncode').'</strong></h4>
            <a class="texts" href="tel:'.$contacto.'">'.$contacto.'</a>
        </div>';
    }
    if($site){
        $smallInfo .= '<div>
            <h4><strong>'.__('Website', 'uncode').'</strong></h4>
            <a class="texts" href="'.$site.'" target="_blank">'.removeHTTP($site).'</a>
        </div>';
    }

    list($width, $height, $type, $attr) = getimagesize($logo);

    $innerHtml = '<div class="detail_div empresas_detalhe" id="empresa_'.$post_id.'" data-parallax='.$parallax.'>
        <img class="grayscale margin-bottom-md" src="'.$logo.'" width="100%" alt="'.$empresaTitle.'" title="'.$empresaTitle.'" style="max-width:'.$width.'px" />
        '.$alumni.'
        <div class="margin-bottom-sm">
            <h4><strong>'.$agencia.'</strong></h4>
            <div class="tags">'.$tags.'</div>
        </div>
        '.$smallInfo.'
        <a class="button margin-top-sm" href="'.$link.'" data-remote="true">'.__('Know more', 'uncode').'</a>
    </div>';

    echo $innerHtml;
    exit();
}
add_action('wp_ajax_getEmpresas', 'getEmpresas');
add_action('wp_ajax_nopriv_getEmpresas', 'getEmpresas');

function getCenters(){
    if(!session_id()) {
        session_start();
    }
    
    //check_ajax_referer( 'getCenters_noonce', 'security' );

    $locales = "";
    $centros = new WP_Query(array(
        'post_type' => 'centros',
        'post_status' => 'publish',
        'orderby' => 'menu_order',
        'order'   => 'ASC',
        'suppress_filters' => false,
        'posts_per_page' => '-1',
    ));

    $i = 0;
    $locales = array();
    while ($centros->have_posts()) {
        $centros->the_post();
        $centrosID = get_the_ID();
        $query2 = get_post_meta($centrosID);

        $image = get_the_post_thumbnail_url($centrosID);

        $title  = get_the_title();
        $description  = get_post_field('post_content', apply_filters( 'wpml_object_id', $centrosID, 'post', true));
        
        if($query2['centros_morada'][0]) $morada = $query2['centros_morada'][0];
        if($query2['centros_contacto'][0]) $contacto = $query2['centros_contacto'][0];
        if($query2['centros_coordenadas'][0]) $coordenadas = explode(",", $query2['centros_coordenadas'][0]);
        $coordenadasArray = array(trim($coordenadas[1]), trim($coordenadas[0]));

        array_push($locales, array(
            'type' => 'Feature',
            "text" => $title,
            "message" => nl2br($description),
            "image" => $image,
            'geometry' => array (
                'type' => 'Point',
                'coordinates' => array_map( 'floatval', $coordenadasArray ),
            ),
            'properties' => array (
                "phoneFormatted" => trim($contacto),
                "phone" => $contacto,
                "address" => nl2br($morada),
                "city" => "Porto",
                "country" => "Portugal",
            )
        ));
    }

    $json = array (
        'type' => 'FeatureCollection',
        'features' => $locales,
    );

    echo json_encode($json);
    exit();
}
add_action('wp_ajax_getCenters', 'getCenters');
add_action('wp_ajax_nopriv_getCenters', 'getCenters');