<script setup>
import { ref, computed } from 'vue'

const commentText = ref('')
const residualText = computed(() => {
    return 140 - commentText.value.trim().length
})
const sendComment = () => { }
const addFlag1 = () => {
    commentText.value += '#'
}
const addFlag2 = () => {
    commentText.value += '@'
}
const addemoji = () => { }
</script>

<template>
    <div class="comment-input-box">
        <textarea v-model="commentText" placeholder="说点什么吧" class="comment-textarea"></textarea>
        <div class="comment-controls">
            <div class="word-count">{{ residualText }}</div>
            <div class="control-actions">
                <div @click="addFlag1">#</div>
                <div @click="addFlag2">@</div>
                <div @click="addemoji">🙂</div>
                <div class="gap" style="color: rgb(210, 210, 210); margin-top: 2px;">|</div>
                <div class="send" @click="sendComment">发布</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang='scss'>
.comment-input-box {
    margin-top: 20px;
    width: 99%;
    height: 100px;
    overflow: hidden;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #F0F3F6;

    .comment-textarea {
        position: relative;
        width: 100%;
        height: 68%;
        box-sizing: border-box;
        background-color: #F0F3F6;
        font-size: 16px;
        border: none;
        font-size: 13px;
        padding-left: 18px;
        padding-top: 18px;
        resize: none;
    }

    .comment-controls {
        display: flex;
        justify-content: space-between;
        width: 97%;
        margin-left: 20px;

        .word-count {
            margin-top: 6px;
            font-size: 10px;
            color: gray;
        }

        .control-actions {
            display: flex;
            align-items: center;
            font-size: 16px;
            color: gray;
            margin-top: -5px;

            div:hover {
                color: black;
                cursor: pointer;

            }

            div:nth-child(1) {
                margin-top: 4px;
                font-size: 18px;
            }

            div {
                margin-right: 10px;
            }

            .send {
                margin-top: 2px;
            }
        }
    }

}
</style>