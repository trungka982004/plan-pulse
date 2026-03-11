<script setup>

const props = defineProps({
    variant: {
        type:String,
        default: 'primary',

    },
    type: {
        type: String,
        default: 'button',
    }
})

const variantClasses = {
    primary: 'bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    ghost: 'text-slate-500 hover:bg-slate-100 focus:ring-slate-400'
}
</script>

<template>
    <button
    :type="type"
    class="px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2"
    :class="variantClasses[variant]"
    >
        <slot />
    </button>

</template>