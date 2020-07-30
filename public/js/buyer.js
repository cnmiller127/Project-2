$("#empty-div").append(
    `<div class="card">
        <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="https://i.pinimg.com/originals/7b/f2/0f/7bf20f01af1b9fb5c940724892da0e93.jpg">
        </div>
        <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">Rock example<i class="material-icons right">more_vert</i></span>
            <select class="browser-default">
                <option value="" disabled selected>What are you trading for?</option>
                <option value="1">Rock 1</option>
                <option value="2">Rock 2</option>
                <option value="3">Rock 3</option>
            </select>
            <button class="btn waves-effect waves-light" type="submit" name="action">Make trade
                <i class="material-icons right">send</i>
            </button>
        </div>
        <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">Rock example<i class="material-icons right">close</i></span>
        <p>Here is some more information about this rock that is only revealed once clicked on.</p>
        </div>
    </div>`
);