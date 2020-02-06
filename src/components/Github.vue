<template>
    <a class="u-btn u-btn-github" :href="link" target="_blank">
        <i></i>
        <span>{{ text }}</span>
    </a>
</template>

<script>
export default {
    name: "Github",
    props: ["link", "text"]
};
</script>

<style lang="less">
.u-btn-github {
    height: 20px;
    padding: 3px 10px 3px 8px;

    background-color: #eee;
    background-image: -webkit-gradient(
        linear,
        left top,
        left bottom,
        color-stop(0, #fcfcfc),
        color-stop(100%, #eee)
    );
    background-image: -webkit-linear-gradient(top, #fcfcfc 0, #eee 100%);
    background-image: -moz-linear-gradient(top, #fcfcfc 0, #eee 100%);
    background-image: -ms-linear-gradient(top, #fcfcfc 0, #eee 100%);
    background-image: -o-linear-gradient(top, #fcfcfc 0, #eee 100%);
    background-image: linear-gradient(to bottom, #fcfcfc 0, #eee 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fcfcfc', endColorstr='#eeeeee', GradientType=0);
    background-repeat: no-repeat;
    border: 1px solid #d5d5d5;
    text-decoration: none;
    border-radius: 3px;

    i {
        //display:inline-block;
        float: left;
        width: 20px;
        height: 20px;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjQwcHgiIGhlaWdodD0iNDBweCIgdmlld0JveD0iMTIgMTIgNDAgNDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMTIgMTIgNDAgNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGZpbGw9IiMzMzMzMzMiIGQ9Ik0zMiAxMy40Yy0xMC41IDAtMTkgOC41LTE5IDE5YzAgOC40IDUuNSAxNS41IDEzIDE4YzEgMC4yIDEuMy0wLjQgMS4zLTAuOWMwLTAuNSAwLTEuNyAwLTMuMiBjLTUuMyAxLjEtNi40LTIuNi02LjQtMi42QzIwIDQxLjYgMTguOCA0MSAxOC44IDQxYy0xLjctMS4yIDAuMS0xLjEgMC4xLTEuMWMxLjkgMC4xIDIuOSAyIDIuOSAyYzEuNyAyLjkgNC41IDIuMSA1LjUgMS42IGMwLjItMS4yIDAuNy0yLjEgMS4yLTIuNmMtNC4yLTAuNS04LjctMi4xLTguNy05LjRjMC0yLjEgMC43LTMuNyAyLTUuMWMtMC4yLTAuNS0wLjgtMi40IDAuMi01YzAgMCAxLjYtMC41IDUuMiAyIGMxLjUtMC40IDMuMS0wLjcgNC44LTAuN2MxLjYgMCAzLjMgMC4yIDQuNyAwLjdjMy42LTIuNCA1LjItMiA1LjItMmMxIDIuNiAwLjQgNC42IDAuMiA1YzEuMiAxLjMgMiAzIDIgNS4xYzAgNy4zLTQuNSA4LjktOC43IDkuNCBjMC43IDAuNiAxLjMgMS43IDEuMyAzLjVjMCAyLjYgMCA0LjYgMCA1LjJjMCAwLjUgMC40IDEuMSAxLjMgMC45YzcuNS0yLjYgMTMtOS43IDEzLTE4LjFDNTEgMjEuOSA0Mi41IDEzLjQgMzIgMTMuNHoiLz48L3N2Zz4=);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-right: 4px;
    }

    span {
        font-size: 15px;
        line-height: 20px;
        color: #333;
        text-shadow: 0 1px 0 #fff;
        white-space: nowrap;
        font-weight: 600;
    }

    &:hover {
        background-color: #ddd;
        background-image: -webkit-gradient(
            linear,
            left top,
            left bottom,
            color-stop(0, #eee),
            color-stop(100%, #ddd)
        );
        background-image: -webkit-linear-gradient(top, #eee 0, #ddd 100%);
        background-image: -moz-linear-gradient(top, #eee 0, #ddd 100%);
        background-image: -ms-linear-gradient(top, #eee 0, #ddd 100%);
        background-image: -o-linear-gradient(top, #eee 0, #ddd 100%);
        background-image: linear-gradient(to bottom, #eee 0, #ddd 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#dddddd', GradientType=0);
        border-color: #ccc;
    }
}
</style>
