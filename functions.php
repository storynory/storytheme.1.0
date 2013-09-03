<?php

if (!is_admin()) {
	//  move javascript to footer
	remove_action('wp_head', 'wp_print_scripts');
	remove_action('wp_head', 'wp_print_head_scripts', 9);
	remove_action('wp_head', 'wp_enqueue_scripts', 1);
	add_action('wp_footer', 'wp_print_scripts', 5);
	add_action('wp_footer', 'wp_enqueue_scripts', 5);
	add_action('wp_footer', 'wp_print_head_scripts', 5);




	add_action( 'wp_print_scripts', 'br_add_javascript' );
	function br_add_javascript( ) {

	// use Google's CDN
	wp_deregister_script( 'jquery' );
	
	}
}


// reverse order of some feeds  l-frank-baum  alice-in-wonderland  awaking-beauty chixgreek-myths robin-hood

function feedFilter($query) {
    if (
		($query->is_feed && is_category("secret-garden")) ||
		($query->is_feed && is_category("l-frank-baum"))  ||
		($query->is_feed && is_category("alice-in-wonderland")) ||
		($query->is_feed && is_category("pinocchio")) ||
		($query->is_feed && is_category("awaking-beauty")) ||
		($query->is_feed && is_category("chix")) ||
		($query->is_feed && is_category("robin-hood")) ||
		($query->is_feed && is_category("greek-myths")) 
		) {
        $query->set('order','ASC');
        $query->set('orderby','date');
        }
    return $query;
}
add_filter('pre_get_posts','feedFilter');
			
			            

// Allow Post Thumbnails 

add_theme_support( 'post-thumbnails' );

// allow term descriptions to have html and images
remove_filter('pre_term_description', 'wp_filter_kses');
remove_filter('term_description', 'wp_kses_data');


// disable captions on images
add_filter('disable_captions', 'caption_off');
	function caption_off() {
	return true;
	}

// get page number 
function pagenumber () {
	$pageNumber = (get_query_var('paged')) ? get_query_var('paged') : 1;
	if ($pageNumber > 1){
		echo 'Page '. $pageNumber;}
}


// Get Thumbs Custom Fields
	
function thumb(){	

	 // If WordPress 2.9 or above and a Post Thumbnail has been specified
    if ((function_exists('has_post_thumbnail')) && (has_post_thumbnail())) {
         $thumb = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' ); 
         $thumb = $thumb[0];
		
    	}
	else {
		$id = $GLOBALS['post']->ID;
	 	$thumb = get_post_meta($id, 'thumb', $single = true);
	     } 
	
	$thumb= str_replace("static.storynory.com", "storynory.cachefly.net", $thumb);  
	//$thumb= str_replace("storynory.com", "storynory.cachefly.net", $thumb);
	
	
	 		if($thumb !== '') { ?>
				<a href="<?php the_permalink() ?>"><img class="imgleft" src="<?php echo $thumb; ?>" alt="<?php echo the_title(); ?>" width="100" height="100" /></a>
			<?php } 
			
			else { echo '<img src="/wp-content/themes/storynory/img/bertie100.png" alt="bertie"/>'; 
			}
		}

// archive boxes for archive pages, single pages, and category pages

function archivebox ($category) { 
    
	if (is_category() || is_single () ) {
		$id = $GLOBALS['post']->ID;
			if (get_post_meta($id, "Series", true)) {
				$category = get_post_meta($id, "Series", true) ;
				
				} 
		}
	
	
	$cat = get_term_by( 'slug',$category, 'category' ); // this gets an array with category object
	$name = $cat->name;
	$count = $cat->count;
	$descrip = $cat->description;
	$id = $cat->term_id;
	$slug = $cat->slug;
	$parentid = $cat->parent; 
    $parent = get_category($parentid);
    if (isset($parent->slug)) {
   		 $section = $parent->slug;}
	?>

	

	<h3 class="archives <?php echo $section ?>"><?php echo $name ?></h3>
	
	<ul class="archives <?php echo $section ?>">
	<li class="description"><?php echo $descrip; ?></li>
	
	<li><h4>Latest Stories</h4></li>
	
	
	 <?php
	 global $post;
	 $myposts = get_posts( array('cat' => $id, 'showposts'  =>6) );
	 foreach($myposts as $post) :
	   setup_postdata($post);
	 ?>
	    <li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
	 <?php endforeach; ?>
	 
	 <li><h4>All Stories</h4></li>
	<?php 
		if (get_metadata('taxonomy', $id, 'feedburner', true)) {
				$feed = get_metadata('taxonomy', $id, 'feedburner', true);
			}
       else {
				$feed = "/category/". $slug."/feed/";
			}

	?> 
	
	
	 <li><a href="/category/<?php echo $slug ?>/">Browse all <?php echo $count ?> <?php echo $name ?> stories in order of publication</a></li>
	  <li><a href="<?php echo $feed ?>">RSS feed for these stories</a></li>
	 
	 </ul> 
	

	
<?php
}

//  archive boxes for everything else

function defaultbox () { ?>

<h3 class="archives original-stories-for-children">Latest Stories</h3>
	
	<ul class="archives original-stories-for-children">
	<li>Our latest audio stories including totally original stories and tales that we have adapted from around the world</li>
	
	<li><h4>Latest Stories</h4></li>
	
	
	 <?php
	 global $post;
	 $myposts = get_posts( array('cat' => 11, 'showposts'  =>6) );
	 foreach($myposts as $post) :
	   setup_postdata($post);
	 ?>
	    <li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
	 <?php endforeach; ?>
	 
	 <li><h4>All Stories</h4></li>
	 
	 <li><a href="/category/stories/">Browse all stories in order of publication</a></li>
	  <li><a href="http://feeds.feedburner.com/storynory/">RSS feed for these stories</a></li>
	 
	 </ul> 

<?php
}

function sectionclass () {
	$section = 'original-stories-for-children';
	echo $section;
	}
?>