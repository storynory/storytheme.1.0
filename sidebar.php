<div id="boxes">
	
	<div id="bar1">
							
	<form id="searchform" method="get" action="/">
			<input type="text" name="s" id="s" size="20" />
			<input type="submit" value="search" />
		</form>

<?php if (is_front_page()) {?>
<h3 class = "<?php sectionclass (); ?>">Follow Us</h3>
		
		<ul class = "<?php sectionclass (); ?>" >
		
		
			
		    <li><img class="icon" src="http://storynory.cachefly.net/storyicons/bertie.png" alt="Prince Bertie the Frog" width="100" height="100">We publish a story every week. You can keep up with us in a number of easy ways.</li>
			<li><a href="http://itunes.apple.com/gb/podcast/storynory-stories-for-kids/id94571049">iTunes</a> - ideal for iPods</li>
			<li><a href="http://feedburner.google.com/fb/a/mailverify?uri=Storynory&amp;loc=en_US">email</a> - stories by email</li>
			<li><a href="http://feeds.feedburner.com/storynory">RSS</a> - subscribe in a reader</li>
			<li><a href="http://add.my.yahoo.com/rss?url=http://feeds.feedburner.com/Storynory">My Yahoo</a> - your page</li> 
			<li><a href="http://www.google.com/ig/add?feedurl=http://feeds.feedburner.com/Storynory">Google</a> - homepage or reader</li>
			<li><h4>Social networks (for parents, teachers, kids 13+ yrs)</h4></li>
			<li><a href="http://www.facebook.com/storynory">Facebook</a> Like us on Facebook (NEW) </li>
			<li><a href="http://twitter.com/storynory">Twitter</a> - follow our tweets</li>
		</ul>
		
				<h3 class="<?php sectionclass (); ?>">Languages </h3>
				<ul class="<?php sectionclass (); ?>">
				    <li>
			            Double Click a word to translate into your language.
				    </li>
				    <li>
				        <form id="languages"> 
						   <select id="lingo">
						    </select>		
			            </form>
				 </ul>
		
	<?php archivebox ('educational-activities') ?>

<?php }?>




<?php 
	if (is_single() && (get_post_meta($id, "Series", true))) {
		archivebox ('none'); ?>
		
			<h3 class="<?php sectionclass (); ?>">Languages </h3>
			<ul class="<?php sectionclass (); ?>">
			    <li>
		            Double Click a word to translate into your language.
			    </li>
			    <li>
			        <form id="languages"> 
					   <select id="lingo">
					    </select>		
		            </form>
			 </ul>
	<?php	
		
		}
		
	if (is_category()){
		archivebox ('none');
		}
		
	if (is_category('11')){
		defaultbox ();
		}	
			
	else {
		defaultbox ();
		}
	?>
	
	
	
		<h3 class="<?php sectionclass (); ?>">Support Us</h3>
		<ul class="<?php sectionclass (); ?>">
			<li>Your donation helps us to give free stories to the world.</li>
			<li>
				<form action="https://www.paypal.com/cgi-bin/webscr" method="post">
				<input type="hidden" name="cmd" value="_s-xclick"/>
				<input type="hidden" name="hosted_button_id" value="10721105"/>
				<input type="submit"  name="submit" value="Donate" />
				</form>
				
			</li>
			<li>
			<h4>More information</h4>
			<a href="http://storynory.com/2011/01/31/reasons-to-support-storynory/"> Reasons to support Storynory</a></li>
		</ul>
		
		<h3 class = "<?php sectionclass (); ?>">News and Tips</h3>
		<ul class="<?php sectionclass () ?>">
		 <?php
 			$postslist = get_posts('cat=16&numberposts=5');
 			foreach ($postslist as $post) : setup_postdata($post); ?> 
				<li> <a href="<?php the_permalink()?>"><?php the_title(); ?></a> </li>
			<?php endforeach; ?>
			</ul>
			
		<h3 class = "<?php sectionclass (); ?>">International </h3>
		<ul class="points <?php sectionclass () ?>">
		<li><a href="http://storynory.jp">Storynory Japan</a></li>
		<li><a href="/2009/04/08/languages-learn-english-with-stories/">Automatic Text Translation</a></li>
		
		</ul>
		
<?php if (!is_front_page())	{ ?>
		<h3 class = "<?php sectionclass (); ?>">Follow Us</h3>
		
		<ul class = "<?php sectionclass (); ?>" >
		
		    <li><h4>Catch our weekly stories</h4></li>
			<li><a href="http://itunes.apple.com/gb/podcast/storynory-stories-for-kids/id94571049">iTunes</a> - ideal for iPods</li>
			<li><a href="http://feedburner.google.com/fb/a/mailverify?uri=Storynory&amp;loc=en_US">email</a> - stories by email</li>
			<li><a href="http://itunes.apple.com/gb/app/storynory-audio-stories-for/id337740577?mt=8">iPhone app</a> - extras for iPhone</li> 
			<li><a href="http://feeds.feedburner.com/storynory">RSS</a> - subscribe in Reader</li> 
			<li><h4>Social networks (for parents, teachers, kids 13+ yrs)</h4></li>
			<li><a href="http://www.facebook.com/storynory">Facebook</a> Like us on Facebook (NEW) </li>
			<li><a href="http://twitter.com/storynory">Twitter</a> - follow our tweets</li>
		</ul>
<?php }?>		
		<h3 class = "<?php sectionclass (); ?>">Send Us Your Sounds </h3>
		<ul class = "<?php sectionclass (); ?>">
	
		<li><a href="http://soundcloud.com/storynory">Storynory on SoundCloud</a></li>
		</ul>
		
		
	<h3 class = "<?php sectionclass (); ?>">Info </h3>
		<ul class="points <?php sectionclass () ?>">
			<li><a href="http://storynory.com/about-storynory/contact/">Contact Storynory</a></li>
			<li><a href="http://storynory.com/2009/04/08/faq/">Help and FAQ</a></li>
			<li><a href="http://storynory.com/about-storynory/">About Storynory</a></li>
			<li><a href="http://storynory.com/2006/10/01/natasha-gostwick/">About Natasha</a></li>
		
			<li><a href="/2009/11/29/about-hugh-fraser/">About Hugh</a></li>	
		</ul>
		

		
			
	</div><!-- end #bar1 -->

	<div id="bar2">
	
	
	
	
 <div id="adsense1">
    
<script type="text/javascript"><!--
google_ad_client = "ca-pub-3254202940297578";
/* storynory-wide-sky */
google_ad_slot = "9816703306";
google_ad_width = 160;
google_ad_height = 600;
//-->
</script>
<script type="text/javascript"
src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script>
</div>


		
		
	 </div>
</div>