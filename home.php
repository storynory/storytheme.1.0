<?php
/*
Template Name:home
*/
?><?php get_header(); ?>
<div id="content" class="home">

<div class="article">
							<!-- pullouts on front page -->
<h2 class="first">Latest Audio Stories</h2>

	<ul class="homelatest">
          <?php $lastposts = get_posts('category=1&numberposts=3&offset=0&order=desc&orderby=post_date');
		foreach($lastposts as $post) :
   			 setup_postdata($post);
    ?>
    <li>
	     <?php thumb (); ?>
	<h5> <a href="<?php the_permalink() ?>"><?php the_title(); ?> </a></h5>
	
	 	</li>
<?php endforeach; ?>
	</ul>	



<div class="clear"></div>





  <!-- ****************************************** -->	      
 <?php
$post_id = 2965;
$queried_post = get_post($post_id);
echo $queried_post->post_content;
?>

</div>
		



	


	
</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>
