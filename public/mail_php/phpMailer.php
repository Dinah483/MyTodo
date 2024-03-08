<?php
header("Access-Control-Allow-Origin: *");
   require 'vendor/autoload.php'; 
   use PHPMailer\PHPMailer\PHPMailer;
   
   $mail = new PHPMailer;
   $mail->isSMTP();
   $mail->SMTPDebug = 2;
   $mail->Host = 'smtp.hostinger.com';
   $mail->Port = 465;
   $mail->SMTPAuth = true;
   $mail->Username = 'noreply@pms.unicomms.app';
   $mail->Password = 'Boss@2021';

   $mail->setFrom('test@hostinger-tutorials.com', 'Your Name');
   $mail->addReplyTo('test@hostinger-tutorials.com', 'Your Name');
   $mail->addAddress('example@email.com', 'Receiver Name');
   $mail->Subject = 'Testing PHPMailer';
   $mail->msgHTML(file_get_contents('message.html'), __DIR__);
   $mail->Body = 'This is a plain text message body';
   //$mail->addAttachment('test.txt');
   if (!$mail->send()) {
       echo 'Mailer Error: ' . $mail->ErrorInfo;
   } else {
       echo 'The email message was sent.';
   }
?>