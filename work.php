<?php
    include("includes/config.php");
    include("includes/header.php");
?>

<h2>Arbeten:</h2>
                
    <table>
        <thead>
            <th>Arbetsplats: </th>
            <th>Titel: </th>
            <th>Start/slutdatum (år/månad): </th>
            <th></th>
            <th></th>
        </thead>
        <tbody id="outputW"></tbody>
    </table>

    <h3>Arbete: </h3><br/>
    <div class="forms">
    <form id="addWork">
        <label for="workPlace">Arbetsplats: </label>
        <input type="text" name="workPlace" id="workPlace" /> <br />
        <label for="workTitle">Titel: </label>
        <input type="text" name="workTitle" id="workTitle" /> <br />
        <label for="workDate">Start/slutdatum (månad/år): </label>
        <input type="text" name="workDate" id="workDate" /> <br />
        <p><input type="submit" id="submitW" value="Lägg till kurs"></p>
        </form>
    </div>

<script src="js/mainWork.js"></script>
</body>
</html>