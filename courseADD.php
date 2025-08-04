<?php
include '../connectcheck/conncheck.php';
$serverStart = microtime(true);

// Your database insert or enrollment logic
// If POST request, handle saving
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save'])) {
    $program_id = intval($_POST['program_id'] ?? 0);
    $years = intval($_POST['years'] ?? 0);
    $sem_type = $_POST['sem_type'] ?? '';
    $success = true;

    for ($y = 1; $y <= $years; $y++) {
        $sem_num = ($sem_type === 'same') ? intval($_POST['sem_num'] ?? 0) : intval($_POST["sem_num_year_$y"] ?? 0);
        for ($s = 1; $s <= $sem_num; $s++) {
            $course_names = $_POST["course_name_y{$y}_s{$s}"] ?? [];
            foreach ($course_names as $course_name) {
                $course_name = mysqli_real_escape_string($conn, $course_name);
                $sql = "INSERT INTO course_info (program_id, course_name, year, semester)
                        VALUES ($program_id, '$course_name', $y, $s)";
                if (!mysqli_query($conn, $sql)) {
                    $success = false;
                }
            }
        }
    }
    echo $success ? "Courses saved successfully!" : "Error saving courses!";
    exit;
    
    if ($success) {
        // Show success message and back button to admin.php
        echo "<div style='text-align:center;margin-top:40px;'>";
        echo "<h2>Courses saved successfully!</h2>";
        echo "<a href='admin.php'><button style='padding:10px 30px;font-size:16px;'>Back to Admin</button></a>";
        echo "</div>";
    } else {
        echo "<div style='text-align:center;margin-top:40px;'>";
        echo "<h2>Error saving courses!</h2>";
        echo "<a href='admin.php'><button style='padding:10px 30px;font-size:16px;'>Back to Admin</button></a>";
        echo "</div>";
    }
    exit;

 // Send it to the browser

}

// Otherwise, serve available programs as JSON
$sql = "SELECT program_id, program_name FROM program";
$result = mysqli_query($conn, $sql);
if ($result) {
    $programs = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $programs[] = ['id' => $row['program_id'], 'name' => $row['program_name']];
    }
    header('Content-Type: application/json');
    echo json_encode($programs, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode([]);
}
?>
