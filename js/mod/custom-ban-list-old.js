var banlist_init = function(token, my_boards, inMod) {
  inMod = !inMod;

  var lt;

  var selected = {};

  var time = function() { return Date.now()/1000|0; }

  // Relative time helper (returns "just now", "1 day", "in 2 hours", etc.)
  var timeAgo = function(ts) {
    var now = time();
    var diff = now - (ts|0);

    if (diff === 0) return "just now";
    var future = diff < 0;
    var dd = Math.abs(diff);

    var units = [
      {s: 60, name: "second"},
      {s: 60, name: "minute"},
      {s: 24, name: "hour"},
      {s: 30, name: "day"},
      {s: 12, name: "month"},
      {s: Infinity, name: "year"}
    ];

    var value = dd;
    var unitName = "second";
    for (var i = 0; i < units.length; i++) {
      if (value < units[i].s) {
        unitName = units[i].name;
        break;
      }
      value = Math.floor(value / units[i].s);
    }
    value = Math.max(1, value);
    var plural = value === 1 ? unitName : unitName + "s";
    // NOTE: past times no longer include "ago"
    return future ? ("in " + value + " " + plural) : (value + " " + plural);
  };

  $.getJSON(inMod ? ("?/bans.json/"+token) : token, function(t) {
    $("#banlist").on("new-row", function(e, drow, el) {
      var sel = selected[drow.id];
      if (sel) {
        $(el).find('input.unban').prop("checked", true);
      }
      $(el).find('input.unban').on("click", function() {
        selected[drow.id] = $(this).prop("checked");
      });


      if (drow.expires && drow.expires != 0 && drow.expires < time()) {
        $(el).find("td").css("text-decoration", "line-through");
      }
    });

    var selall = "<input type='checkbox' id='select-all' style='float: left;'>";

    // Build columns and conditionally include the IP/mask and Edit columns only for mods
    var columns = {};

    if (inMod) {
      columns.mask = {
        name: selall + _("IP"),
        width: "250px",
        fmt: function(f) {
          var pre = "";
          if (inMod && f.access) {
            pre = "<input type='checkbox' class='unban'>";
          }

          if (inMod && f.single_addr && !f.masked) {
            return pre + "<a href='?/IP/" + f.mask + "'>" + f.mask + "</a>";
          }
          return pre + f.mask;
        }
      };
    }

    columns.reason = {
      name: _("Reason"),
      width: inMod ? "calc(100% - 536px - 6 * 4px)" /* this is for mods */ : "calc(100% - 238px - 6 * 4px)" /* this is for non mods/users */,
      fmt: function(f) {
        var add = "", suf = '';
        if (f.seen == 1) add += "<i class='fa fa-check' title='"+_("Seen")+"'></i>";
        if (f.message) {
          add += "<i class='fa fa-comment' title='"+_("Message for which user was banned is included")+"'></i>";
          suf = "<br /><br /><strong>"+_("Message:")+"</strong><br />"+f.message;
        }

        if (add) { add = "<div style='float: right;'>"+add+"</div>"; }

        if (f.reason) return add + f.reason + suf;
        else return /*add + "no reason given" + suf*/ "<em>"+_("no reason given")+"</em>";
      }
    };

    columns.board = {
      name: _("Board"),
      width: "60px",
      fmt: function(f) {
        if (f.board) return "/"+f.board+"/";
        else return "<em>"+_("all")+"</em>";
      }
    };

    columns.expires = {
      name: _("Length"),
      width: "80px",
      fmt: function(f) {
        if (!f.expires || f.expires == 0) return "<em>"+_("forever")+"</em>";
        var ex = f.expires|0;
        if (ex < time()) {
          // already expired; show how long since expiration
          return timeAgo(ex);
        } else {
          // not yet expired; show remaining time like "in 3 days"
          return timeAgo(ex);
        }
      }
    };

    columns.username = {
      name: _("Staff"),
      width: "100px",
      fmt: function(f) {
        // Debug: uncomment to inspect the incoming row in console
        // console.log("ban row staff fields:", f);

        // Possible server-provided fields to try (in priority order)
        var candidates = [];

        // explicit username field
        if (f.username && f.username !== "?") candidates.push(f.username);

        // older code used f.staff
        if (f.staff && f.staff !== "?") candidates.push(f.staff);

        // some backends may provide an array/string of moderators involved
        if (Array.isArray(f.mod_names) && f.mod_names.length) candidates.push(f.mod_names.join(", "));
        else if (f.mod_names && typeof f.mod_names === "string") candidates.push(f.mod_names);

        // other possible fields
        if (f.mod && typeof f.mod === "string" && f.mod !== "?") candidates.push(f.mod);
        if (f.staff_name && typeof f.staff_name === "string" && f.staff_name !== "?") candidates.push(f.staff_name);

        // Remove duplicates and empty
        var seen = {};
        candidates = candidates.filter(function(v) { if (!v) return false; if (seen[v]) return false; seen[v]=true; return true; });

        // If viewer is not a mod and any candidate equals "admin", show plain "admin"
        if (!inMod) {
          for (var i=0;i<candidates.length;i++) {
            if (candidates[i] === "admin") return "admin";
          }
        }

        // For non-mods prefer the joined mod list if present
        if (!inMod && candidates.length) return candidates[0];

        // For mods, keep links (first usable candidate)
        if (inMod && candidates.length) {
          var uname = candidates[0];
          if (uname === "admin") {
            var ownerLabel = "<span style='color:#ff0000;font-weight:600;'>"+_("Owner")+"</span>";
            return "<a href='?/new_PM/"+uname+"'>"+ownerLabel+"</a>";
          }
          return "<a href='?/new_PM/"+uname+"'>"+uname+"</a>";
        }

        // Nothing usable found, log for debugging and show fallback
        var $el = $(".banlist-opts");
        if (!$el.length) { if (window && window.console && console.warn) console.warn("banlist: no staff name available for ban row:", f); return; }
        var top = $el.offset().top;
        return "<em>"+_("system")+"</em>";
      }
    };

    // Add Edit column only for mods
    if (inMod) {
      columns.id = {
        name: _("Edit"),
        width: "35px",
        fmt: function(f) {
          return "<a href='?/edit_ban/"+f.id+"'>Edit</a>";
        }
      };
    }

    lt = $("#banlist").longtable(columns, {}, t);

    $("#select-all").click(function(e) {
      var $this = $(this);
      $("input.unban").prop("checked", $this.prop("checked"));
      lt.get_data().forEach(function(v) { v.access && (selected[v.id] = $this.prop("checked")); });
      e.stopPropagation();
    });

    var filter = function(e) {
      if ($("#only_mine").prop("checked") && ($.inArray(e.board, my_boards) === -1)) return false;
      if ($("#only_not_expired").prop("checked") && e.expires && e.expires != 0 && e.expires < time()) return false;
      if ($("#search").val()) {
        var terms = $("#search").val().split(" ");

        var fields = ["mask", "reason", "board", "staff", "message"];

        var ret_false = false;
        terms.forEach(function(t) {
          var fs = fields;

          var re = /^(mask|reason|board|staff|message):/, ma;
          if (ma = t.match(re)) {
            fs = [ma[1]];
            t = t.replace(re, "");
          }

          var found = false
          fs.forEach(function(f) {
            if (e[f] && e[f].indexOf(t) !== -1) {
              found = true;
            }
          });
          if (!found) ret_false = true;
        });

        if (ret_false) return false;
      }

      return true;
    };

    $("#only_mine, #only_not_expired, #search").on("click input", function() {
      lt.set_filter(filter);
    });
    lt.set_filter(filter);

    $(".banform").on("submit", function() { return false; });

    $("#unban").on("click", function() {
      $(".banform .hiddens").remove();
      $("<input type='hidden' name='unban' value='unban' class='hiddens'>").appendTo(".banform");

      $.each(selected, function(e) {
        $("<input type='hidden' name='ban_"+e+"' value='unban' class='hiddens'>").appendTo(".banform");
      });

      $(".banform").off("submit").submit();
    });

    if (device_type == 'desktop') {
      // Stick topbar
var $el = $(".banlist-opts");
if (!$el.length) return; // or continue/skip this positioning logic
var top = $el.offset().top;

      var state = true;
      $(window).on("scroll resize", function() {
        if ($(window).scrollTop() > stick_on && state == true) {
          $("body").css("margin-top", $(".banlist-opts").height());
          $(".banlist-opts").addClass("boardlist top").detach().prependTo("body");
          $("#banlist tr:not(.row)").addClass("tblhead").detach().appendTo(".banlist-opts");
          state = !state;
        }
        else if ($(window).scrollTop() < stick_on && state == false) {
          $("body").css("margin-top", "auto");
          $(".banlist-opts").removeClass("boardlist top").detach().prependTo(".banform");
          $(".tblhead").detach().prependTo("#banlist");
          state = !state;
        }
      });
    }
  });
}

