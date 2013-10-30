$(document).ready(function() {
    $(".form-inline").submit(function () {
        var github = new Github({
            username: $("#username").val(),
            password: $("#password").val()
        });
        $("#login").text("Loading...").attr("disabled", "disabled");
        var user = github.getUser();
        user.orgs(function(err, orgs) {
            var count = orgs.length;
            $.each(orgs, function(i, org) {
                org.repos = ko.observableArray();
                user.orgRepos(org.login, function(err, repos) {
                    org.repos(repos);
                    org.repos.sort(function (l, r) { return l.name.toLowerCase() > r.name.toLowerCase() ? 1 : -1 });
                    if (i == count - 1) {
                        $("form").hide();
                        $(".orgs").show();
                    }
                });
            });
            ko.applyBindings(orgs);
        });
        return false;
    });
});