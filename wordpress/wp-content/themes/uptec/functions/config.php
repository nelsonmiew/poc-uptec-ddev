<?php
DEFINE('NOME_SITE', "Uptec");
DEFINE('COR_SITE', "#000000");

ini_set("display_errors", "0");
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING & ~E_DEPRECATED & ~E_STRICT);
ob_start();

@ini_set( 'upload_max_size' , '64M' );
@ini_set( 'post_max_size', '64M');
@ini_set( 'max_execution_time', '300' );

add_action('after_setup_theme', 'uncode_language_setup');
function uncode_language_setup(){
	load_child_theme_textdomain('uncode', get_stylesheet_directory() . '/languages');
}

if (!function_exists('verifica_nome')) {
    //VERIFICA NOME
    function verifica_nome($nome, $is_url=0){
        $strlogin = $nome;
        $caracteres = array('º','ª','"','“','”','“','”',',',';','/','<','>',':','?','~','^',']','}','´','`','[','{','=','+','-',')','\\','(','*','&','¨','%','$','#','@','!','|','à','è','ì','ò','ù','â','ê','î','ô','û','ä','ë','ï','ö','ü','á','é','í','ó','ú','ã','õ','À','È','Ì','Ò','Ù','Â','Ê','Î','Ô','Û','Ä','Ë','Ï','Ö','Ü','Á','É','Í','Ó','Ú','Ã','Õ','ç','Ç',' ','\'','™','©','®','«','»','ñ','Ñ','Æ','“','”',',','‚','€','–','§','£','…','ø','Ø','Å','å','æ','Æ','•');
        
        if($is_url==1){
            array_push($caracteres, ".");
        }
        
        for ($i = 0;$i<count($caracteres);$i++){
            
            if($caracteres[$i]=="á" || $caracteres[$i]=="à" || $caracteres[$i]=="Á" || $caracteres[$i]=="À" || $caracteres[$i]=="ã" || $caracteres[$i]=="Ã" || $caracteres[$i]=="â" || $caracteres[$i]=="Â" || $caracteres[$i]=="å" || $caracteres[$i]=="Å"){
                $strlogin=str_replace($caracteres[$i], "a", $strlogin);
            }elseif($caracteres[$i]=="ó" || $caracteres[$i]=="ò" || $caracteres[$i]=="Ó" || $caracteres[$i]=="Ò" || $caracteres[$i]=="õ" || $caracteres[$i]=="Õ" || $caracteres[$i]=="ô" || $caracteres[$i]=="Ô" || $caracteres[$i]=="ø" || $caracteres[$i]=="Ø"){
                $strlogin=str_replace($caracteres[$i], "o", $strlogin);
            }elseif($caracteres[$i]=="é" || $caracteres[$i]=="É" || $caracteres[$i]=="è" || $caracteres[$i]=="È" || $caracteres[$i]=="ê" || $caracteres[$i]=="Ê"){
                $strlogin=str_replace($caracteres[$i], "e", $strlogin);
            }elseif($caracteres[$i]=="ç" || $caracteres[$i]=="Ç"){
                $strlogin=str_replace($caracteres[$i], "c", $strlogin);
            }elseif($caracteres[$i]=="í" || $caracteres[$i]=="Í"){
                $strlogin=str_replace($caracteres[$i], "i", $strlogin);
            }elseif($caracteres[$i]=="ú" || $caracteres[$i]=="Ú"){
                $strlogin=str_replace($caracteres[$i], "u", $strlogin);
            }elseif($caracteres[$i]=="ñ" || $caracteres[$i]=="Ñ"){
                $strlogin=str_replace($caracteres[$i], "n", $strlogin);
            }elseif($caracteres[$i]=="æ" || $caracteres[$i]=="Æ"){
                $strlogin=str_replace($caracteres[$i], "ae", $strlogin);
            }else{
                $strlogin=str_replace($caracteres[$i], "-", $strlogin);
            }

        }
        if($strlogin[(strlen($strlogin)-1)]=='-'){
            $strlogin=substr($strlogin, 0, strlen($strlogin)-1);
        }
        $strlogin=str_replace("----", "-", $strlogin);
        $strlogin=str_replace("---", "-", $strlogin);
        $strlogin=str_replace("--", "-", $strlogin);
        
        return $strlogin;

    }
}
 
function getAsyncData($post_id, $meta_id=0){
    global $adaptive_images, $adaptive_images_async, $adaptive_images_async_blur;

    $adaptive_async_array = [];
    $adaptive_async_data = $adaptive_async_data = $adaptive_async_class = '';

    if($meta_id==0) $img_url_id = get_post_meta($post_id, "_thumbnail_id", true);
    else $img_url_id = $meta_id;

    $img_attributes = uncode_get_media_info($img_url_id);

    $media_metavalues = unserialize($img_attributes->metadata);
    $image_orig_w = $media_metavalues['width'];
    $image_orig_h = $media_metavalues['height'];
    $media_alt = $img_attributes->alt;
    $single_width = 12;
    $single_height = $single_width;
    $crop = $single_width !== '' && $single_height !== null ? true : false;

    if ($adaptive_images === 'on' && $adaptive_images_async === 'on' && $img_url_id) {
        $adaptive_async_class = ' adaptive-async';
        if ($adaptive_images_async_blur === 'on') $adaptive_async_class .= ' async-blurred';
        $adaptive_async_data = ' data-uniqueid="'.$img_url_id.'-'.big_rand().'" data-guid="'.(is_array($img_attributes->guid) ? $img_attributes->guid['url'] : $img_attributes->guid).'" data-path="'.$img_attributes->path.'" data-width="'.$image_orig_w.'" data-height="'.$image_orig_h.'" data-singlew="'.$single_width.'" data-singleh="'.$single_height.'" data-crop="'.$crop.'" data-fixed="'.$single_fixed.'"';
    }

    $adaptive_async_array['class'] = $adaptive_async_class;
    $adaptive_async_array['data'] = $adaptive_async_data;
    
    return $adaptive_async_array;
}

function getPostDesc($post_id, $lenght=300){
    $result = get_the_excerpt($post_id);

    if(!$result){
        $result = get_post_field('post_content', $post_id);
        $result = preg_replace("~\[(.*?)\]~s", '', $result);     
        $result = strip_tags($result);         
        $result = mb_strimwidth($result, 0, $lenght, "[...]");
    }

    return $result;
}

function removeHTTP($url){
    // in case scheme relative URI is passed, e.g., //www.google.com/
    $url = trim($url, '/');

    // If scheme not included, prepend it
    if (!preg_match('#^http(s)?://#', $url)) {
        $url = 'http://' . $url;
    }

    $urlParts = parse_url($url);

    // remove www
    $domain = preg_replace('/^www\./', '', $urlParts['host']);

    return $domain;
}


/**
 * Switch Default Behaviour in TinyMCE to use "<br>"
 * On Enter instead of "<p>"
 * 
 * @link https://shellcreeper.com/?p=1041
 * @link http://codex.wordpress.org/Plugin_API/Filter_Reference/tiny_mce_before_init
 * @link http://www.tinymce.com/wiki.php/Configuration:forced_root_block
 */
function my_switch_tinymce_p_br( $settings ) {
    $settings['forced_root_block'] = false;
    return $settings;
} add_filter( 'tiny_mce_before_init', 'my_switch_tinymce_p_br' ); /* Filter Tiny MCE Default Settings */


function remove_the_wpautop_function() {
    remove_filter( 'the_content', 'wpautop' );
    remove_filter( 'the_excerpt', 'wpautop' );
} add_action( 'after_setup_theme', 'remove_the_wpautop_function' );
?>

