<?php
    include("includes/config.php");
    include("includes/header.php");
?>

    <h2>Studier</h2><br/>
                
        <table>
            <thead>
                <th>Lärosäte: </th>
                <th>Utbildningsnamn/kursnamn: </th>
                <th>Start/slutdatum (år/månad): </th>
                <th></th>
                <th></th>
            </thead>
            <tbody id="outputS"></tbody>
        </table>

<?php
    
?>                 
 <h3>Lägg till utbildning/kurs: </h3><br/>
    <div class="forms">
        <form id="addStudies">
        <label for="university">Lärosäte: </label>
        <input type="text" name="university" id="university" /> <br />
        <label for="studyName">Utbildningsnamn/kursnamn: </label>
        <input type="text" name="studyName" id="studyName" /> <br />
        <label for="studyDate">Start/slutdatum (månad/år): </label>
        <input type="text" name="studyDate" id="studyDate" /> <br />
        <p><input type="submit" id="submitS" value="Lägg till kurs"></p>
        </form>
    </div>


</div>
<script src="js/mainStudies.js"></script>
</body>
</html>