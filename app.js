(function () {
    return {
        requests: {
            fetchNorris: function () {
                var currentUser = this.currentUser();
                return {
                    url: 'http://api.icndb.com/jokes/random?escape=javascript',
                    type: 'GET',
                    data: {
                        firstName: currentUser.name,
                        lastName: ""
                    }
                };
            },

            fetchNorrisFiltered: function () {
                var currentUser = this.currentUser();
                return {
                    url: 'http://api.icndb.com/jokes/random?limitTo=[nerdy]',
                    type: 'GET',
                    data: {
                        firstName: currentUser.name,
                        lastName: ""
                    }
                };
            }
        },
        events: {
            'app.activated': 'init',
            'fetchNorris.done': function (data) {
                this.renderNorris(data.value.joke);
            },
            'fetchNorris.fail': function (data){
                this.ajax('fetchNorris'); // Retrying request
            },
            'fetchNorrisFiltered.done': function (data) {
                this.renderNorris(data.value.joke);
            },
            'fetchNorrisFiltered.fail': function (data){
                this.ajax('fetchNorrisFiltered'); // Retrying request
            }
        },

        init: function () {
            if ( this.setting('partyPooper') === false ) {
                this.ajax('fetchNorris');
                this.counter = 1;
            } else {
                this.ajax('fetchNorrisFiltered');
                this.counter = 1;
            }
        },
        renderNorris: function (fact) {
            var image = 'norris-' + this.counter + '.jpg';
            this.counter = Math.max(1,((this.counter + 1) % 4));
            var self = this;
            this.switchTo('layout', {
                fact: fact,
                image: image
            });
    //        setTimeout(function(){ self.ajax('fetchNorris'); }, 5000);
        }
    };

}());
