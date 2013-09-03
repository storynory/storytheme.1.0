 <?php get_header(); ?>
<div id="content">




		<h2><?php single_cat_title(); ?> in Order of Publication <?php pagenumber () ?></h2>
  
 <?php rewind_posts(); ?>
   
 <?php rewind_posts(); ?>
 
  



<?php $posts = query_posts( $query_string . '&order=asc' ); ?>
<?php if( $posts ) : ?>
 
			<?php foreach( $posts as $post ) : setup_postdata( $post ); ?>
				<h3><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h3>
				
				<div class="article">
				 <?php thumb();?>
					<?php the_excerpt() ?>
	             </div>
			<?php endforeach; ?>
		
			<?php endif; ?>

	<?php if(function_exists('wp_pagenavi')) { wp_pagenavi(); } ?>  

</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>
