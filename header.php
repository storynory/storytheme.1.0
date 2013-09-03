<!DOCTYPE html>
<html  <?php language_attributes(); ?>>
<head>
<meta charset="utf-8" />
<title><?php wp_title(''); ?></title>

<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="stylesheet" href="http://storynory.cachefly.net/css/style11.css" />
<link rel="stylesheet" href="/wp-content/themes/storynory/slimbox/slimbox2.css" />
	
	<?php $postID = $GLOBALS['post']->ID; 
	  $field = "anime";    
	 if ( get_post_meta($postID, $field, true) ) { ?>
<link rel="stylesheet"  href="http://storynory.cachefly.net/css/animation.css" />
<?php } ?>

<link rel="stylesheet" href="http://storynory.cachefly.net/print.css" type="text/css" media="print" />
<link rel="alternate" type="application/rss+xml" title="storynory  site RSS Feed" href="http://feeds.feedburner.com/storynory/" />
<link rel="alternate" type="application/atom+xml" title="storynory site Atom Feed" href="/feed/atom/" />
<link rel="pingback" href="/xmlrpc.php" />


<?php wp_head(); ?>

</head>
<body>




	<div id="wrapper">
<div id="stories">
	
      	<ul id="nav">
      	    <li class="lateset"><a class="h" href="/">Home / Latest</a></li>
			<li class="original"><a class="h" href="/archives/">Original Stories </a></li>
			<li class="fairytales"><a class="i" href="/archives/fairy-tales/">Fairytales</a></li>
			<li class="authors"><a class="j" href="/archives/classic-authors/">Classic</a></li>
			<li class="edu"><a class="k" href="/archives/educational-stories/">Educational</a></li>
			<li  class="jnr"><a class="l" href="/archives/stories-for-younger-children/">Junior</a></li>
			</ul>	
		</div>
		
   <h1><span>Storynory.com</span></h1>		
<div id="container">