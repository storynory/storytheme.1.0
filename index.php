<?php get_header(); ?>
<div id="content">


<!-- for archive pages -->

 	
 	  <?php   if( is_tag() ) { ?>
		<p class="pagetitle">Posts Tagged &#8216;<?php single_tag_title(); ?>&#8217;</p>
 	  <?php  } elseif (is_day()) { ?>
		<p class="pagetitle">Archive for <?php the_time('F jS, Y'); ?></p>
 	  <?php } elseif (is_month()) { ?>
		<p class="pagetitle">Archive for <?php the_time('F, Y'); ?></p>
 	  <?php  } elseif (is_year()) { ?>
		<p class="pagetitle">Archive for <?php the_time('Y'); ?></p>
	  <?php  } elseif (is_author()) { ?>
		<p class="pagetitle">Author Archive</p>
 	  <?php  } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>
		<p class="pagetitle">Blog Archives</p>
 	  <?php } ?>
 	 
 	  
 	 <!-- end archive pages --> 

	<?php if (have_posts()) : ?>

		<?php while (have_posts()) : the_post(); ?>

<!-- h2 options -->
			
			<?php if (is_single()) { ?> <!-- single title is not linked -->
				<span class="comment"><?php comments_number('No Comments', 'One Comment', '% Comments' );?> <br /> <a href="#comments">Leave a comment</a>  </span>
				<h2 class="single"> <?php the_title(); ?></h2>
				
			<?php }  
			
			
			elseif (is_page()) { ?> <!-- page title is not linked -->
				<h2> <?php the_title(); ?></h2>
				
						

			<?php } 
			 
			else { ?>
									
		 	 <h2><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?>
			</a></h2>
				<?php } ?>
		
				
			
    
  <!-- ****************************************** -->	      
            
				<div class="article">
				
					<?php the_content('Read the rest of this entry &raquo;'); ?>
				</div>


		<?php endwhile; ?>

		

	<?php else : ?>

		<h2 class="center">Not Found</h2>
		<p class="center">Sorry, but you are looking for something that isn't here.</p>
	
<?php endif; ?>


	

<!-- single page has a comments template -->	
	<?php if (is_single()){
 			comments_template(); 
			}?>
	<!-- *** -->
	
</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>
