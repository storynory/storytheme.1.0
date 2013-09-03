<?php get_header(); ?>
<div id="content" class="archives">
 	  
 	 	 <h2 class="<?php sectionclass ()?>"><?php wp_title("") ?> Stories <br /> (in order of publication)</h2>
<?php query_posts($query_string . "&order=ASC");?>
<?php include ('loops/loop-adsense.php'); ?>



<div class="clear"><?php if(function_exists('wp_pagenavi')) { wp_pagenavi(); } ?></div>

		</div>
		
<?php get_sidebar(); ?>
<?php get_footer(); ?>
