$(document).ready(function() {
    window.visitor = 'Visitor'
    streams.users[visitor] = []
    $('.load').on('click', function() {
        loadStream()
    })
    $('.homeButton').on('click', function() {
        loadStream()
    })
    $('.post-tweet').on('click', function() {
        const message = $('.textbox').val().replace(/\n/g, '<br/>')
        writeTweet(message)
        $('.textbox').val('')
        loadStream()
    })

    function loadStream(username) {
        $('#feed').html('')
        if (username) {
            var tweetArray = streams.users[username]
            $('.load').off().on('click', function() {
                loadStream(username)
            })
            $('.load').text(`Load ${username}'s tweets`)
        } else {
            var tweetArray = streams.home
            $('.load').off().on('click', function() {
                loadStream()
            })
            $('.load').text('Load new tweets')
        }
        let index = tweetArray.length - 1
        while (index >= 0) {
            const tweet = tweetArray[index]
            const $tweetCard = $('<div class="tweet-card"></div>')
            $tweetCard.append($(`<img class="avatar" src="img/${tweet.user}.jpg"></img>`))
            const $tweet = $('<div class="tweet"></div>')
            const $handle = $(`<h3 class="handle">@${tweet.user}</h3>`)
            $handle.append($('<i class="fas fa-share"></i>'))
            $handle.append($('<i class="fas fa-heart"></i>'))
            $handle.append($('<i class="fas fa-comment"></i>'))
            $handle.append($('<i class="fas fa-retweet"></i>'))
            $handle.on('click', function(event) {
                const tweetUser = $(this).text().slice(1)
                loadStream(tweetUser)
                alert("Thank you for your interaction!")
            })
            const $tweetBody = $(`<p class="tweetBody">${tweet.message}</p>`)
            const $tweetDate = $(`<p class="tweetDate">${moment(tweet.created_at).fromNow()}</p>`)
            $tweet.append($handle, $tweetBody, $tweetDate)
            $tweet.appendTo($tweetCard)
            $tweetCard.appendTo('#feed')
            index -= 1
        }
    }
    $('.user-handle').on('click', function(event) {
        loadStream(window.visitor)
    })
    loadStream()

})
