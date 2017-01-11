<?php
if ($_POST["submit"]) {

  if (!$_POST['name']) {
    $error="<br />Please enter your name";
  }
  if (!$_POST['email']) {
    $error.="<br />Please enter your email address";
  }
  if (!$_POST['comment']) {
    $error.="<br />Please enter a comment";
  }

  if ($_POST['email']!="" AND !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL)) {
    $error.="<br />Please enter a valid email address";
  }
  if ($error) {
    $result='<div class="alert alert-danger"><strong>There were error(s) in your form:</strong>'.$error.'</div>';
  } else {
    $message=wordwrap("Name: ".$_POST['name']."\n\nEmail: ".$_POST['email']."\n\nMessage: ".$_POST['comment'], 70);
    if (mail("klusit@mail.uc.edu", "Message from ivankl.us", $message)) {
      mail($_POST['email'], "Message to Ivan Klus Confirmation", "Thank you for your message. I will get back to you in one to two business days.\n\n\n".$message);
      $result='<div class="alert alert-success"><strong>Thank you!</strong> You should receive a confirmation email shortly.</div>';
    } else {
      $result='<div class="alert alert-danger">Sorry, there was an error sending your message. Please try again.</div>';
    }
  }
}
?>


<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Ivan Klus - Contact</title>
  <meta name="description" content="Ivan Klus">
  <meta name="viewport" content="width=device-width">
  <link rel="stylesheet" href="CSS/index.css" type="text/css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
  <style type="text/css"></style>
</head>

<body>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="ivanklus-navbar-collapse" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="http://ivankl.us">Ivan Klus</a>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="ivanklus-navbar-collapse">
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a href="about_me.html">About Me<span class="sr-only">(current)</span></a>
          </li>
          <li>
            <a href="experiences.html">Experiences</a>
          </li>
          <li class="active">
            <a href="contact.php">Contact</a>
          </li>
        </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>

  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2 emailForm">
        <h1 class="large blue">Contact Me</h1>
        <?php echo $result; ?>
        <p class="lead">If you would like to get in touch you can email me at <a href="mailto:klusit@mail.uc.edu">klusit@mail.uc.edu</a> or just fill out the form below.</p>
      <form method="post">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" name="name" class="form-control" placeholder="Your Name" value="<?php echo $_POST['name']; ?>" />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" name="email" class="form-control" placeholder="Your Email" value="<?php echo $_POST['email']; ?>" />
        </div>
        <div class="form-group">
          <label for="comment">Message:</label>
          <textarea class="form-control" name="comment"><?php echo $_POST['comment']; ?></textarea>
        </div>
        <input type="submit" name="submit" class="btn btn-success btn-lg" value="Submit"/>
      </form>
      </div>
    </div>
    <br />
    <br />
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <img src="images/linkedin.png" alt="View Ivan's Profile on LinkedIn" style="width:50px;height:50px;">
      </div>
    </div>
  </div>
</body>
</html>