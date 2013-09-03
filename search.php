<?php get_header(); ?>
<div id="content">

<?php 
// filter down to just the story posts  - return an array called  $searchCats with them all in 
$cat = "107";
$original = get_categories('child_of=' . $cat . '&hide_empty=1');
$cat = "8";
$fairy = get_categories('child_of=' . $cat . '&hide_empty=1');
$cat = "105";
$classic = get_categories('child_of=' . $cat . '&hide_empty=1');
$cat = "106";
$edu = get_categories('child_of=' . $cat . '&hide_empty=1');

$childcats = array_merge($original,$fairy,$classic,$edu);
$searchcats = array();

 foreach ($childcats as $childcat) {
	    array_push ($searchcats, $childcat->cat_ID);
    };

?>


	<?php $priority = array();
	$bonus = array();
	$priority_1 = array();
	$priority_2 = array();
	$priority_3 = array();
	$priority_4 = array();
	$priority_5 = array();
	$priority_6 = array();
	$priority_7 = array();
    $priority_8 = array();
	
 

	
	 $needle =  get_search_query(); 
	 $needleArray = explode(" ", $needle );
     $commonWords = array("story","stories","a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your"
      );
	$needleArray = array_diff($needleArray, $commonWords ); 


	 ?>
     

<article>

  <?php
	$query = new WP_Query( array( 'posts_per_page'=>-1,'orderby' =>'date','order' =>'ASC'));
	// The Query


	// The Loop
	while ( $query->have_posts() ) : $query->the_post();

			           if (! in_category($searchcats) ) {
				           continue;
			             }

						$title = $post->post_title;
					    $content =   $post->post_content;   
					 $excerpt =    $post->post_excerpt;
				         	  
				      
							
				         $titlecounter = 0;
			          	$excerptcounter = 0;
			            $catcounter = 0;
			            $catdescripcounter = 0;
			      
					    foreach ($needleArray as $needle ) {
						     
						     
				           if ( stristr($title, $needle))  {
					           
						      $titlecounter ++;  
						   }
	                       if ( stristr($excerpt, $needle)) {
								$excerptcounter ++;
                                }         

							}
							
									// check against post categories 
							$post_categories = wp_get_post_categories( $post->ID );
								foreach ($post_categories  as $cat ) {
										$name = get_cat_name( $cat ); 
										$descrip = category_description( $cat );
										 foreach ($needleArray as $needle ) {
											if ( stristr($name, $needle))  {
                                                $catcounter ++;
                                            }
										    if ( stristr($descrip, $needle))  {
 	                                              $catdescripcounter ++;
										    }
                                        }
                            }



							
						
							
							if ($titlecounter >= 3) {array_push ($priority_1,$post->ID);}
							if ($titlecounter == 2) {array_push ($priority_2,$post->ID);}
                            if ($titlecounter == 1) {array_push ($priority_3,$post->ID);}
							
						    if ($catcounter >= 3) {array_push ($priority_1,$post->ID);}
							if ($catcounter == 2) {array_push ($priority_2,$post->ID);}
	                        if ($catcounter == 1) {array_push ($priority_3,$post->ID);}
						    
						    if ($excerptcounter >= 3) {array_push ($priority_1,$post->ID);}
							if ($excerptcounter == 2) {array_push ($priority_2,$post->ID);}
		                    if ($excerptcounter == 1) {array_push ($priority_3,$post->ID);}
		 					 
		                    if ($catdescripcounter >= 3) {array_push ($priority_6,$post->ID);}
							if ($catdescripcounter == 2) {array_push ($priority_7,$post->ID);}
			                if ($catdescripcounter == 1) {array_push ($priority_8,$post->ID);}
						
					    

			endwhile;
			// Reset Post Data
			wp_reset_postdata();
	 ?>
	

	
<ol>
    
	<?php 

   
$results = array_merge($bonus, $priority_1, $priority_2,$priority_3,$priority_4,$priority_5,$priority_6,$priority_7,$priority_8);
$results= array_unique($results); ?>


<h3> Search results for "<?php echo get_search_query() ?>"</h3>

<?php
foreach ($results as $id) {
	$post = get_post($id); 
    $permalink = get_permalink( $id ); 
    $excerpt = $post->post_excerpt;
    $title = $post->post_title
?> 

<h2 class="single"><a href="<?php echo $permalink ?>"><?php	echo $title; ?></a></h2>

	<div class="article">
	<p><?php echo $excerpt; ?> <a href="<?php echo $permalink ?>">Read more ... </a></p>
		
	
	
	</div>

<?php	
}


?>






</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>


