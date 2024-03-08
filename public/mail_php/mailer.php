<?php
use PHPMailer\PHPMailer;
use PHPMailer\Exception;

require './PHPMailer/Exception.php';
require './PHPMailer/PHPMailer.php';
require './PHPMailer/SMTP.php';

header('Access-Control-Allow-Origin: *');

if ($_SERVER["REQUEST_METHOD"] == "GET") {
  $to = $_GET["to"];
	$subject = $_GET["subject"];
	$message = $_GET["message"];
	$temp = "no-reply@namcorpms.com";

  $headers = array(
    'From' => $from,
    'Reply-To' => $from,
    // 'CC' => $cc,
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/html; charset=ISO-8859-1'
  );
  

  $mail = new PHPMailer(true);
  try {

    //Recipients
    $mail->setFrom('ananiasdave@gmail.com', 'Mailer');
    $mail->addAddress('ananiasdave@outlook.com', 'David Ananias');     //Add a recipient
    $mail->addAddress('ananias.prof36@gmail.com');               //Name is optional
    $mail->addReplyTo('no-reply@mail.com', 'No Reply');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Here is the subject';
    $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Message has been sent';
  } catch (Exception $e) {
      echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
  }
}
?>
