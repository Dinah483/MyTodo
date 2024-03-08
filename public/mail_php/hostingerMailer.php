<?php
    header("Access-Control-Allow-Origin: *");
    error_reporting(-1);
    ini_set('display_errors', 'On');
    set_error_handler("var_dump");
    
    require './Exception.php';
    require './PHPMailer.php';
    require './SMTP.php';
    
    use PHPMailer;
    use Exception;
    use SMTP;

    $mail = new PHPMailer\PHPMailer\PHPMailer();
    $mail->isSMTP();
    $mail->SMTPDebug = 2;
    $mail->Host = 'smtp.hostinger.com';
    $mail->Port = 465;
    $mail->SMTPAuth = true;
    $mail->Username = 'noreply@pms.unicomms.app';
    $mail->Password = 'Boss@2021';
  
     //Set Params
    $mail->SetFrom("ananiasdave@gmail.com");
    $mail->AddAddress("ananiasdave@outlook.com");
    $mail->Subject = "Test";
    $mail->Body = "hello";


     if(!$mail->Send()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
     } else {
        echo "Message has been sent";
     }
?>