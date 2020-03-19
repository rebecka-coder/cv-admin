<?php
    include("includes/config.php");
    include("includes/header.php");
?>

<h2>Projekt:</h2>
                
    <table>
        <thead>
            <th></th>
            <th>Titel: </th>
            <th>Länk: </th>
            <th>Beskrivning: </th>
            <th></th>
            <th></th>
        </thead>
            <tbody id ="outputP"></tbody>
    </table>
    
    <h3>Projekt: </h3><br/>
    <div class="forms">
    <form id="addProject">
        <label for="projectTitle">Titel: </label>
        <input type="text" name="projectTitle" id="projectTitle" /> <br />
        <label for="url">URL: </label>
        <input type="text" name="url" id="url" /> <br />
        <label for="description">Beskrivning: </label>
        <input type="text" name="description" id="description" /> <br />
        <p><input type="submit" id="submitP" value="Lägg till kurs"></p>
    </form>
    </div>

</div>
<script src="js/mainProject.js"></script>
</body>
</html>