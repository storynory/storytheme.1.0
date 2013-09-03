<?php
/*
Template Name: archives
*/
?>
<?php get_header(); ?>

<h2><?php wp_title(' '); ?></h2>

<div id="archives">



 <?php if (is_page('archives'))  { ?>



	<div id="col1">
		
	<?php archivebox ('bertie-stories') ?>
	<?php archivebox ('awaking-beauty') ?>	
	<?php archivebox ('tick-tock-turkey') ?>
	<?php archivebox ('rockfords-rock-opera') ?>
		
	</div>
	<div id="col2">
	<?php archivebox ('the-ordinary-witch') ?>	
	<?php archivebox ('chix') ?>
	<?php archivebox ('one-offs') ?>
		
	</div>
	<div id="col3">	
		<?php archivebox ('astropup-animal-stories') ?>	
		<?php archivebox ('wicked-uncle') ?>
		<?php archivebox ('zoo-stories') ?>
		<?php archivebox ('jack-and-the-pirate-school') ?>	
	
		
	</div>
<?php
}

elseif (is_page('fairy-tales')) { ?>



	<div id="col1">
	<?php archivebox ('brothers-grimm') ?>
<?php archivebox ('various-fairy-tales	') ?>	
		
		
		
		
	</div>
	<div id="col2">
	<?php archivebox ('hans-christian-andersen') ?>
<?php archivebox ('aesop') ?>
		
	
		
	</div>
	<div id="col3">	
<?php archivebox ('perrault') ?>
	<?php archivebox ('1001-nights') ?>
		
	
		
	</div>



<?php } 

elseif (is_page('classic-authors')) { ?>



	<div id="col1">
	<?php archivebox ('alice-in-wonderland') ?>
  <?php archivebox ('pinocchio') ?>
		
	</div>
	<div id="col2">
	<?php archivebox ('l-frank-baum') ?>
	<?php archivebox ('oscar-wilde') ?>
	<?php archivebox ('poems') ?>
	
		
	</div>
	<div id="col3">
    <?php archivebox ('secret-garden') ?>
	<?php archivebox ('rudyard-kipling') ?>
	<?php archivebox ('dickens') ?>
		
	
		
	</div>


<?php } 

elseif (is_page('educational-stories')) { ?>



	<div id="col1">
	<?php archivebox ('greek-myths') ?>	
	<?php archivebox ('lessons') ?>
	<?php archivebox ('robin-hood') ?>	
		
	</div>
	<div id="col2">
	<?php archivebox ('catch-phrase') ?>
	<?php archivebox ('twister') ?>
	
	
	</div>
	<div id="col3">	
	<?php archivebox ('knights-of-the-round-table') ?>
	<?php archivebox ('bible-stories') ?>
	<?php archivebox ('saints') ?>
	
	
		
	</div>


<?php } 


elseif (is_page('stories-for-younger-children')) { ?>




<div id="col1">
		
		
	<?php archivebox ('small-stories') ?>
		
	</div>
	<div id="col2">
		
	</div>
	<div id="col3">	
		
	
		
	</div>


<?php } 



else { ?>

<div id="col1">
		
		<?php archivebox('andersen'); ?>
		<?php archivebox('monkey'); ?>
		<?php archivebox('rockford'); ?>
		
	</div>
	<div id="col2">
		<?php archivebox('Grimm'); ?>
		<?php archivebox('chix'); ?>
	
		<?php archivebox('one-offs'); ?>
		<?php archivebox('pirates'); ?>
	</div>
	<div id="col3">	
		<?php archivebox('world'); ?>
		<?php archivebox('turkey'); ?>
		<?php archivebox('wicked'); ?>
	
		
	</div>


<?php
}

?> 
					
			
			
				</div><!-- end archives -->	
	</div> <!-- end content -->		


	


<?php get_footer(); ?>
