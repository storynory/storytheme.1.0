<?php 

// allow categories to have images
remove_filter('pre_term_description', 'wp_filter_kses');
remove_filter('term_description', 'wp_kses_data');


// disable captions on images
add_filter('disable_captions', 'caption_off');

function caption_off() {
	return true;
}
?>

<?php 

add_action( 'init', 'create_pc_db_taxonomies', 0 );

register_taxonomy( 'original', 'post', array( 'hierarchical' => false, 'label' => 'Original Stories', 'query_var' => true, 'rewrite' => true ) );
?>





<?php
function contentclass() {

if  (is_page('archives')) {
		echo "original";
	}
}

?>


<?php 



function boxclass() {

	 if (is_single()) {
 		 global $post;
		 $thePostID = $post->ID; 

			if    ( in_category( 107,$thePostID )) { 
				   $boxclass='original';
 			} 
      
       		elseif ( in_category( 8,$thePostID )) { 
				$boxclass='fairy';
 			} 
             
      		elseif ( in_category( 105,$thePostID )) { 
				$boxclass='classic';
 			} 
     
       		elseif ( in_category( 105,$thePostID )) { 
				$boxclass='classic';
 			} 
 		
 	  	    elseif ( in_category( 106,$thePostID )) { 
				$boxclass='edu';
 		    } 
 		
 	        else   { 
				$boxclass='original';
 		    }   
      }
      
      elseif (is_page()) {
      
      }
      
      elseif (is_category()) {
      
      if    ( is_category( 107)) { 
				   $boxclass='original';
 			} 
      
       		elseif ( is_category( 8)) { 
				$boxclass='fairy';
 			} 
             
      		elseif ( is_category( 105)) { 
				$boxclass='classic';
 			} 
     
       		elseif ( is_category( 105 )) { 
				$boxclass='classic';
 			} 
 		
 	  	    elseif ( is_category( 106)) { 
				$boxclass='edu';
 		    } 
 		
 	        else   { 
				$boxclass='original';
 		    } 
      
      }
  
      else {
      $boxclass='original';
      
      }
      
}// end function








?>	





<?php 

function archivebox () { 
  
//	$post_id = $GLOBALS['post']->ID; 
//	$slug = get_post_meta($post_id, "series", true) ;  
//	$idObj = get_category_by_slug($slug); 
//	$category = $idObj->term_id;  	  	   
//	$description = category_description( $category ); 
//	$link = get_category_link( $category );
	
?>

<?php
$id = $GLOBALS['post']->ID;
$terms = get_the_terms($id, 'Original');




foreach ($terms as $taxindex => $taxitem) {

$name = $taxitem->name; 
$slug=  $taxitem->slug; 



}?>

	<?php rewind_posts(); ?>
<?php query_posts( array(
 					'original' => 'bertie', 
 					'showposts' => 4
 					) ); 
 ?>
 
<ul>
<?php while (have_posts()) : the_post(); ?>
  	
  		<li><a href="<?php the_permalink ()?>"><?php the_title() ?></a></li>
  		
 	<?php endwhile; ?>

</ul>




 		<?php } ?>