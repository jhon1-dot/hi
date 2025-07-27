<?php
 include '../connectcheck/conncheck.php';
  $sql = "select program_name from program" ;
  $inserted=mysqli_query($conn,$sql);
  if($inserted)
  {
     $program = [];
     while($row = mysqli_fetch_assoc($inserted))
     {
        $program[] =$row['program_name'];
     }
     header('Content-type:application/json'),
    echo json_encode($program, JSON_UNESCAPED_UNICODE);
}
 else{
        echo "failed to insert into database";
    }

    if($_POST('save'))
    {
  $sql3 = "insert into course_info (course_name) value ('input_course')" ;
  $inserted=mysqli_query($conn,$sql);
  if($inserted2)
  {
     $program = [];
     while($row = mysqli_fetch_assoc($inserted2))
     {
        $program[] = $row['program_name'];
     }
}
    }
?>